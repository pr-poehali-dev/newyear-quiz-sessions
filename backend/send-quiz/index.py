import json
import os
from typing import Dict, Any
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправляет заявки с квиза на email, Telegram или WhatsApp
    Args: event - dict with httpMethod, body; context - object with request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    photo_type = body_data.get('photoType', '')
    participants = body_data.get('participants', '')
    location = body_data.get('location', '')
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    email = body_data.get('email', '')
    
    photo_type_names = {
        'family': 'Семейная фотосессия',
        'kids': 'Детская фотосессия',
        'individual': 'Индивидуальная фотосессия'
    }
    
    location_names = {
        'studio': 'Уютная студия',
        'outdoor': 'На улице',
        'home': 'У вас дома'
    }
    
    message_text = f"""
🎄 НОВАЯ ЗАЯВКА НА ФОТОСЕССИЮ

👤 Имя: {name}
📱 Телефон: {phone}
📧 Email: {email if email else 'не указан'}

📸 Тип: {photo_type_names.get(photo_type, photo_type)}
👥 Участников: {participants}
📍 Локация: {location_names.get(location, location)}

⏰ Время заявки: {datetime.now().strftime('%d.%m.%Y %H:%M')}
"""
    
    results = []
    
    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    if telegram_token and telegram_chat_id:
        try:
            telegram_url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
            telegram_response = requests.post(telegram_url, json={
                'chat_id': telegram_chat_id,
                'text': message_text,
                'parse_mode': 'HTML'
            }, timeout=10)
            if telegram_response.status_code == 200:
                results.append({'channel': 'telegram', 'status': 'sent'})
            else:
                results.append({'channel': 'telegram', 'status': 'error', 'message': telegram_response.text})
        except Exception as e:
            results.append({'channel': 'telegram', 'status': 'error', 'message': str(e)})
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = os.environ.get('SMTP_PORT', '587')
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    recipient_email = os.environ.get('RECIPIENT_EMAIL')
    
    if smtp_host and smtp_user and smtp_password and recipient_email:
        try:
            msg = MIMEMultipart()
            msg['From'] = smtp_user
            msg['To'] = recipient_email
            msg['Subject'] = f'Новая заявка на фотосессию от {name}'
            
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <h2 style="color: #9b87f5;">🎄 Новая заявка на новогоднюю фотосессию</h2>
                    <p><strong>Имя:</strong> {name}</p>
                    <p><strong>Телефон:</strong> {phone}</p>
                    <p><strong>Email:</strong> {email if email else 'не указан'}</p>
                    <hr>
                    <p><strong>Тип фотосессии:</strong> {photo_type_names.get(photo_type, photo_type)}</p>
                    <p><strong>Количество участников:</strong> {participants}</p>
                    <p><strong>Локация:</strong> {location_names.get(location, location)}</p>
                    <hr>
                    <p style="color: #888;">Заявка получена: {datetime.now().strftime('%d.%m.%Y в %H:%M')}</p>
                </body>
            </html>
            """
            
            msg.attach(MIMEText(html_body, 'html'))
            
            server = smtplib.SMTP(smtp_host, int(smtp_port))
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
            server.quit()
            
            results.append({'channel': 'email', 'status': 'sent'})
        except Exception as e:
            results.append({'channel': 'email', 'status': 'error', 'message': str(e)})
    
    whatsapp_api_url = os.environ.get('WHATSAPP_API_URL')
    whatsapp_token = os.environ.get('WHATSAPP_TOKEN')
    whatsapp_phone = os.environ.get('WHATSAPP_PHONE')
    
    if whatsapp_api_url and whatsapp_token and whatsapp_phone:
        try:
            whatsapp_response = requests.post(
                whatsapp_api_url,
                headers={'Authorization': f'Bearer {whatsapp_token}'},
                json={
                    'phone': whatsapp_phone,
                    'message': message_text
                },
                timeout=10
            )
            if whatsapp_response.status_code == 200:
                results.append({'channel': 'whatsapp', 'status': 'sent'})
            else:
                results.append({'channel': 'whatsapp', 'status': 'error', 'message': whatsapp_response.text})
        except Exception as e:
            results.append({'channel': 'whatsapp', 'status': 'error', 'message': str(e)})
    
    if not results:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'No notification channels configured'})
        }
    
    success_channels = [r['channel'] for r in results if r['status'] == 'sent']
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'channels': success_channels,
            'results': results
        })
    }
