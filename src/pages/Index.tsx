import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface QuizData {
  photoType: string;
  participants: string;
  location: string;
  name: string;
  phone: string;
  email: string;
}

const Index = () => {
  const [step, setStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>({
    photoType: '',
    participants: '',
    location: '',
    name: '',
    phone: '',
    email: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const createSnowflakes = () => {
      const container = document.getElementById('snowflakes-container');
      if (!container) return;

      for (let i = 0; i < 30; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄️';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        snowflake.style.animationDuration = (Math.random() * 3 + 5) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(snowflake);
      }
    };

    createSnowflakes();
  }, []);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Заявка отправлена! ✨",
      description: "Мы свяжемся с вами в ближайшее время для обсуждения волшебной фотосессии",
    });
    setTimeout(() => {
      setStep(0);
      setQuizData({
        photoType: '',
        participants: '',
        location: '',
        name: '',
        phone: '',
        email: '',
      });
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="text-6xl animate-float mb-6">🎄</div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer">
                Новогодняя Фотосессия
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Создадим волшебные семейные воспоминания в сказочной новогодней атмосфере
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={18} />
                <span>5 минут</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={18} />
                <span>Для всей семьи</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Sparkles" size={18} />
                <span>Волшебство</span>
              </div>
            </div>
            <Button onClick={handleNext} size="lg" className="text-lg px-12 py-6 rounded-full shadow-lg hover:scale-105 transition-transform">
              Начать путешествие ✨
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold">Какую фотосессию хотите?</h2>
              <p className="text-muted-foreground">Выберите формат, который вам ближе</p>
            </div>
            <RadioGroup
              value={quizData.photoType}
              onValueChange={(value) => setQuizData({ ...quizData, photoType: value })}
              className="grid gap-4"
            >
              <Card
                className={`p-6 cursor-pointer transition-all hover:scale-102 hover:shadow-xl ${
                  quizData.photoType === 'family' ? 'border-primary border-2 bg-primary/10' : ''
                }`}
                onClick={() => setQuizData({ ...quizData, photoType: 'family' })}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="family" id="family" />
                  <div className="flex-1">
                    <Label htmlFor="family" className="text-xl font-semibold cursor-pointer flex items-center gap-2">
                      <span className="text-3xl">👨‍👩‍👧‍👦</span>
                      Семейная фотосессия
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Запечатлеем всю семью вместе с новогодним настроением
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-6 cursor-pointer transition-all hover:scale-102 hover:shadow-xl ${
                  quizData.photoType === 'kids' ? 'border-primary border-2 bg-primary/10' : ''
                }`}
                onClick={() => setQuizData({ ...quizData, photoType: 'kids' })}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="kids" id="kids" />
                  <div className="flex-1">
                    <Label htmlFor="kids" className="text-xl font-semibold cursor-pointer flex items-center gap-2">
                      <span className="text-3xl">👶</span>
                      Детская фотосессия
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Только малыши в сказочной новогодней студии
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-6 cursor-pointer transition-all hover:scale-102 hover:shadow-xl ${
                  quizData.photoType === 'santa' ? 'border-primary border-2 bg-primary/10' : ''
                }`}
                onClick={() => setQuizData({ ...quizData, photoType: 'santa' })}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="santa" id="santa" />
                  <div className="flex-1">
                    <Label htmlFor="santa" className="text-xl font-semibold cursor-pointer flex items-center gap-2">
                      <span className="text-3xl">🎅</span>
                      С Дедом Морозом и Снегурочкой
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Настоящее волшебство с любимыми сказочными героями
                    </p>
                  </div>
                </div>
              </Card>
            </RadioGroup>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold">Сколько человек будет?</h2>
              <p className="text-muted-foreground">Это поможет подготовить идеальную локацию</p>
            </div>
            <RadioGroup
              value={quizData.participants}
              onValueChange={(value) => setQuizData({ ...quizData, participants: value })}
              className="grid gap-4"
            >
              <Card
                className={`p-6 cursor-pointer transition-all hover:scale-102 hover:shadow-xl ${
                  quizData.participants === '1-2' ? 'border-primary border-2 bg-primary/10' : ''
                }`}
                onClick={() => setQuizData({ ...quizData, participants: '1-2' })}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="1-2" id="1-2" />
                  <Label htmlFor="1-2" className="text-xl font-semibold cursor-pointer flex items-center gap-2">
                    <span className="text-3xl">👤</span>
                    1-2 человека
                  </Label>
                </div>
              </Card>

              <Card
                className={`p-6 cursor-pointer transition-all hover:scale-102 hover:shadow-xl ${
                  quizData.participants === '3-4' ? 'border-primary border-2 bg-primary/10' : ''
                }`}
                onClick={() => setQuizData({ ...quizData, participants: '3-4' })}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="3-4" id="3-4" />
                  <Label htmlFor="3-4" className="text-xl font-semibold cursor-pointer flex items-center gap-2">
                    <span className="text-3xl">👥</span>
                    3-4 человека
                  </Label>
                </div>
              </Card>

              <Card
                className={`p-6 cursor-pointer transition-all hover:scale-102 hover:shadow-xl ${
                  quizData.participants === '5+' ? 'border-primary border-2 bg-primary/10' : ''
                }`}
                onClick={() => setQuizData({ ...quizData, participants: '5+' })}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="5+" id="5+" />
                  <Label htmlFor="5+" className="text-xl font-semibold cursor-pointer flex items-center gap-2">
                    <span className="text-3xl">👨‍👩‍👧‍👦</span>
                    5 и более человек
                  </Label>
                </div>
              </Card>
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold">Где проведём фотосессию?</h2>
              <p className="text-muted-foreground">Каждая локация создаёт свою атмосферу</p>
            </div>
            <RadioGroup
              value={quizData.location}
              onValueChange={(value) => setQuizData({ ...quizData, location: value })}
              className="grid gap-4"
            >
              <Card
                className={`p-6 cursor-pointer transition-all hover:scale-102 hover:shadow-xl ${
                  quizData.location === 'studio' ? 'border-primary border-2 bg-primary/10' : ''
                }`}
                onClick={() => setQuizData({ ...quizData, location: 'studio' })}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="studio" id="studio" />
                  <div className="flex-1">
                    <Label htmlFor="studio" className="text-xl font-semibold cursor-pointer flex items-center gap-2">
                      <span className="text-3xl">🏠</span>
                      Уютная студия
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Тёплая атмосфера, профессиональное освещение, новогодний декор
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-6 cursor-pointer transition-all hover:scale-102 hover:shadow-xl ${
                  quizData.location === 'outdoor' ? 'border-primary border-2 bg-primary/10' : ''
                }`}
                onClick={() => setQuizData({ ...quizData, location: 'outdoor' })}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="outdoor" id="outdoor" />
                  <div className="flex-1">
                    <Label htmlFor="outdoor" className="text-xl font-semibold cursor-pointer flex items-center gap-2">
                      <span className="text-3xl">🌨️</span>
                      На улице
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Настоящая зима, снег, морозная свежесть и естественный свет
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-6 cursor-pointer transition-all hover:scale-102 hover:shadow-xl ${
                  quizData.location === 'home' ? 'border-primary border-2 bg-primary/10' : ''
                }`}
                onClick={() => setQuizData({ ...quizData, location: 'home' })}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value="home" id="home" />
                  <div className="flex-1">
                    <Label htmlFor="home" className="text-xl font-semibold cursor-pointer flex items-center gap-2">
                      <span className="text-3xl">🏡</span>
                      У вас дома
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Комфортная обстановка, ваша ёлка, семейная атмосфера
                    </p>
                  </div>
                </div>
              </Card>
            </RadioGroup>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold">Как с вами связаться?</h2>
              <p className="text-muted-foreground">Отправим предложение и обсудим все детали</p>
            </div>
            <div className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg">Ваше имя</Label>
                <Input
                  id="name"
                  placeholder="Как вас зовут?"
                  value={quizData.name}
                  onChange={(e) => setQuizData({ ...quizData, name: e.target.value })}
                  className="text-lg py-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-lg">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={quizData.phone}
                  onChange={(e) => setQuizData({ ...quizData, phone: e.target.value })}
                  className="text-lg py-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg">Email (необязательно)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={quizData.email}
                  onChange={(e) => setQuizData({ ...quizData, email: e.target.value })}
                  className="text-lg py-6"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8 animate-fade-in text-center">
            <div className="text-6xl animate-float mb-6">🎁</div>
            <h2 className="text-4xl font-bold">Идеальное предложение для вас!</h2>
            
            <Card className="p-8 max-w-2xl mx-auto space-y-6 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="space-y-4">
                <div className="flex items-start gap-4 text-left">
                  <div className="text-3xl">
                    {quizData.photoType === 'family' && '👨‍👩‍👧‍👦'}
                    {quizData.photoType === 'kids' && '👶'}
                    {quizData.photoType === 'santa' && '🎅'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Тип фотосессии</h3>
                    <p className="text-muted-foreground">
                      {quizData.photoType === 'family' && 'Семейная фотосессия'}
                      {quizData.photoType === 'kids' && 'Детская фотосессия'}
                      {quizData.photoType === 'santa' && 'С Дедом Морозом и Снегурочкой'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <div className="text-3xl">👥</div>
                  <div>
                    <h3 className="font-semibold text-lg">Количество участников</h3>
                    <p className="text-muted-foreground">{quizData.participants} человек(а)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <div className="text-3xl">
                    {quizData.location === 'studio' && '🏠'}
                    {quizData.location === 'outdoor' && '🌨️'}
                    {quizData.location === 'home' && '🏡'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Локация</h3>
                    <p className="text-muted-foreground">
                      {quizData.location === 'studio' && 'Уютная студия'}
                      {quizData.location === 'outdoor' && 'На улице'}
                      {quizData.location === 'home' && 'У вас дома'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-xl">Что входит в пакет:</h3>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-primary" size={20} />
                      <span>1-2 часа съёмки</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-primary" size={20} />
                      <span>30-50 обработанных фотографий</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-primary" size={20} />
                      <span>Новогодний реквизит и декор</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="text-primary" size={20} />
                      <span>Доставка фото через 3-5 дней</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <div className="text-3xl font-bold text-primary mb-2">от 5 000 ₽</div>
                <p className="text-sm text-muted-foreground">Точная стоимость после консультации</p>
              </div>
            </Card>

            <p className="text-muted-foreground max-w-xl mx-auto">
              Мы свяжемся с вами в ближайшее время, чтобы обсудить все детали и подобрать идеальное время для съёмки
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return quizData.photoType !== '';
      case 2:
        return quizData.participants !== '';
      case 3:
        return quizData.location !== '';
      case 4:
        return quizData.name !== '' && quizData.phone !== '';
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div id="snowflakes-container" className="fixed inset-0 pointer-events-none z-10" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/20" />
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-20 container mx-auto px-4 py-12 max-w-4xl">
        {step > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="gap-2"
              >
                <Icon name="ArrowLeft" size={20} />
                Назад
              </Button>
              <div className="text-sm text-muted-foreground">
                Шаг {step} из 5
              </div>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
          {renderStep()}

          {step > 0 && step < 5 && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleNext}
                size="lg"
                disabled={!canProceed()}
                className="text-lg px-12 py-6 rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                {step === 4 ? 'Получить предложение ✨' : 'Продолжить'}
              </Button>
            </div>
          )}

          {step === 5 && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleSubmit}
                size="lg"
                className="text-lg px-12 py-6 rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                Отправить заявку 🎄
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;
