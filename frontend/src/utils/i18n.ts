// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: {
        header_about_link: 'Главная',
        header_police_link: "Политика",
        header_tests_link: "Тесты",
        profile:'Профиль',
        competetion_hr: `Конкурс на включение в кадровый резерв АО "Каражанбасмунай"`,
        take_part : "Принять участие",
        who_can_take_part: "Кто может принять участие?",
        education_level: "С высшим образованием.",
        has_one_year_experience: `Работники АО "Каражанбасмунай"
        С опытом работы в компании не менее 1 года.`,
        profile_status_approved: "Одобрено",
        profile_status_rejected: "Не одобрено",
        profile_status_pending: "В ожидании",
        profile_status_interview_scheduled: "Запланировано собеседование",
        profile_status: "Статус заявки",
        user_resume_download: "Скачать",
        resume_empty: "Пусто",
        resume_add: "Добавить",
        resume_delete: "Удалить",
        profile_edit: "Редактировать",
        About_me: "Обо мне",
        with_higher_education: "С высшим Образованием",
        Employees_of_JSC: `Работники АО "Каражанбасмунай"`,
        With_at_least_1_year_of_experience_in_the_company: `С опытом работы в компании не менее 1 года.`,
        Without_disciplinary_penalties: `Без дисциплинарных взысканий`,
        During_the_last_3_years_of_work_in_the_Company: `В течение последних 3-х лет работы в Компании.`,
        When_forming_the_personnel_reserve_the_following_approaches_are_used_to_classify_the_key_positions_of_the_Personnel_Reserve: `
        При формировании кадрового резерва, используется следующие подходы к классификации ключевых должностей Кадрового резерва:`,
        Take_part: "Принять участие",
        body_A_desc: "Общий управленческий уровень, уровень организации и контроля деятельности производственного процесса, руководители ключевых подразделений компании (директора департаментов, заместитель директора департамента, главный бухгалтер, заместитель главного бухгалтера)",
        body_B_desc: "Уровень оперативного управления работой отдела, служб, групп цехов (начальник отдела, начальник цеха, заместитель начальника, руководитель службы)",
        body_C_desc: "Это технический уровень, уровень управления производственно-хозяйственной деятельностью участка, выполнение производственных задач поставленных перед участком (мастер, начальник участка)",
        body_E_desc: "Исполнители, имеющие потенциал роста (молодые специалисты, рабочий персонал)",   

        user_info_job: "Должность",
        user_info_status: "Статус заявки:",
        user_info_experienceTime: "Опыт работы",
        user_info_phone: "Номер телефона",
        user_info_email: "Email",

        user_info_status_select: "Выбрать",
        user_info_status_approve: "Принять",
        user_info_status_reject: "Отклонить",
        user_info_status_pending: "В ожидании",
        user_info_status_interview_scheduled: "Собеседование",
        user_info_status_not_requested: "Не отправлено",

        resume_download: "Скачать резюме",
      },
    },
    kz: {
      translation: {
        header_about_link: 'Басты бет',
        header_police_link: "Саясат",
        header_tests_link: "Тесттер",
        profile: 'Профиль',
        competetion_hr: "«Қаражанбасмұнай» АҚ кадрлық резервіне енгізу конкурсы",
        take_part : "Қатысу",
        who_can_take_part: "Кім қатыса алады?",
        education_level: "Высший образование мен",
        has_one_year_experience: `«Қаражанбасмұнай» АҚ қызметкерлері
        Компанияда кемінде 1 жыл тәжірибесі бар.`,
        profile_status_approved: "Қабылданды",
        profile_status_rejected: "Қабылданбады",
        profile_status_pending: "Күтілуде",
        profile_status: "Арыз статусы",
        user_resume_download: "Құю",
        resume_empty: "Табылмаған",
        resume_add: "Қосу",
        resume_delete: "Кетіру",
        profile_edit: "Ақпаратты өзгерту",
        About_me: "Мен туралы ақпарат",
        with_higher_education: "Жоғары біліммен",
        Employees_of_JSC: `Қаражанбасмұнай "АҚ қызметкерлері"`,
        With_at_least_1_year_of_experience_in_the_company: `Кемінде 1 жыл тәжірибесі бар`,
        Without_disciplinary_penalties: `Тәртіптік жазасыз`,
        During_the_last_3_years_of_work_in_the_Company: `Компанияда жұмыс істеген соңғы 3 жыл ішінде.`,
        When_forming_the_personnel_reserve_the_following_approaches_are_used_to_classify_the_key_positions_of_the_Personnel_Reserve: `
        Кадр резервін қалыптастыру кезінде кадр резервінің негізгі лауазымдарын жіктеуге келесі тәсілдер қолданылады:`,
        Take_part: "Қатысу",
        body_A_desc: "Жалпы басқару деңгейі, өндірістік процестің қызметін ұйымдастыру және бақылау деңгейі, компанияның негізгі бөлімшелерінің басшылары (департамент директорлары, департамент директорының орынбасары, бас бухгалтер, бас бухгалтердің орынбасары)",
        body_B_desc: "Бөлімнің, қызметтердің, цехтар топтарының жұмысын жедел басқару деңгейі (бөлім бастығы, цех бастығы, бастықтың орынбасары, қызмет басшысы)",
        body_C_desc: "Бұл техникалық деңгей, учаскенің өндірістік-шаруашылық қызметін басқару деңгейі, учаскенің алдына қойылған өндірістік міндеттерді орындау (шебер, учаске бастығы)",
        body_E_desc: "Өсу әлеуеті бар орындаушылар (жас мамандар, жұмысшы персонал)",   
        user_info_job: "Қызмет атауы",
        user_info_status: "Арыз статусы",
        user_info_experienceTime: "Жұмыс тәжірибесі",
        user_info_phone: "Телефон номері",
        user_info_email: "Электронды пошта",

        user_info_status_select: "Таңдау",
        user_info_status_approve: "Қабылдау",
        user_info_status_reject: "Қабылдамау",
        user_info_status_pending: "Күтуде",
        user_info_status_not_requested: "Жіберілмеген",
        
        resume_download: "Резюмены құю",
      },
    },
  },
  
  lng: 'ru', // Set the default language
  fallbackLng: 'ru', // Fallback language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;