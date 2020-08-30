'use strict';
//массив с карточками
const initialCards = [
{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

//выбираем все попапы на странице
const popup = document.querySelectorAll('.popup');

//Редактирование
//кнопка редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
//форма редактирования профиля
const popupEditForm = popup[0].querySelector('.popup__container');
//кнопка сохранения профиля
const profileSaveButton = popupEditForm.querySelector('.popup__save-button');
//инпут с именем в форме редактирования
const nameInput = popupEditForm.querySelector('.popup__input[name="name"]');
//инпут с профессией в форме редактирования
const jobInput = popupEditForm.querySelector('.popup__input[name="job"]');
//элементы для вставки значений
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Добавление
//кнопка добавления карточки
const cardAddButton = document.querySelector('.profile__add-button');
//форма добавления карточки
const popupAddForm = popup[1].querySelector('.popup__container');
//кнопка сохранения карточки
const cardSaveButton = popup[1].querySelector('.popup__save-button');
//выбираем картинку и ее подпись
const popupPicture = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__image-subtitle');
//инпуты в форме добавления
const placeName = document.querySelector('.popup__input[name="placeName"]');
const placeLink = document.querySelector('.popup__input[name="placeLink"]');

//контейнер для вставки карточек
const cardsContainer = document.querySelector('.elements__list');

//Функция открытия / закрытия попапа
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

//добавление карточек
const addCardToContainer = (cardElement)  => {
  //шаблон карточки
  const cardsElement = document.querySelector('.cardTemplate').content.cloneNode(true);
  //название карточки
  cardsElement.querySelector('.elements__text').textContent = cardElement.name;
  //картинка карточки
  cardsElement.querySelector('.elements__picture').src = cardElement.link;
  //алттернативное описание
  cardsElement.querySelector('.elements__picture').alt = cardElement.name;
  //лайк
  cardsElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
    evt.target.classList.toggle('heartbeat');
  });

  //кнопка удаления карточки
  cardsElement.querySelector('.elements__delete-button').addEventListener('click', event => {
    const cardItem = event.target.closest('.elements__list-item');
    cardItem.remove();
  });

  //данные для попапа с фото
  cardsElement.querySelector('.elements__picture').addEventListener('click', event => {
    const cardLink = event.target.src;
    const cardName = event.target.closest('.elements__list-item');
    const cardText = cardName.querySelector('.elements__text').textContent;

    // открытие попапа с фото
    popup[2].classList.toggle('popup_opened');
    // присвоение ссылки картинке
    popupPicture.src = cardLink;
    // присвоение названия фото
    popupDescription.textContent = cardText;
  });

  //вставка карточки в дом
  cardsContainer.prepend(cardsElement);
};

// разворачиваем массив
const reversCards = initialCards.reverse();
//рендер элементов
reversCards.forEach(addCardToContainer);

// закрытие попапа редактирования
const popupEditCloseButton = popup[0].querySelector('.popup__close-button');
popupEditCloseButton.addEventListener('click', event => {
  const clickClose = event.target.closest('.popup');
  clickClose.classList.toggle('popup_opened');
});

// закрытие попапа добавления
const cardAddCloseButton = popup[1].querySelector('.popup__close-button');
cardAddCloseButton.addEventListener('click', event => {
  const clickClose = event.target.closest('.popup');
  clickClose.classList.toggle('popup_opened');
  popupAddForm.reset();
});

// закрытие попапа с фото
const photoCloseButton = popup[2].querySelector('.popup__close-button');
photoCloseButton.addEventListener('click', event => {
  const clickClose = event.target.closest('.popup');
  clickClose.classList.toggle('popup_opened');
});

//слушатель на кнопке редактирования профиля
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;   
  togglePopup(popup[0]);
});

//слушатель на кнопке добавления карточки
cardAddButton.addEventListener('click', function () {  
  togglePopup(popup[1]);
});

//сохранение профиля
profileSaveButton.addEventListener('click', event => {
  //отмена поведения
    event.preventDefault();
  //заполнение полей из введенных данных
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  //сброс полей формы
    popupAddForm.reset();
  //закрытие попапа
    const clickClose = event.target.closest('.popup');
    clickClose.classList.toggle('popup_opened');
  });
  
//добавление карточки
cardSaveButton.addEventListener('click', event => {
//отмена поведения
  event.preventDefault();
//создание объекта из введенных данных
  let newCard = 
    {
      name: placeName.value,
      link: placeLink.value
    };
//вызов функции добавления карточки с новым объектом
  addCardToContainer(newCard);
//сброс полей формы
  popupAddForm.reset();
//закрытие попапа
  const clickClose = event.target.closest('.popup');
  clickClose.classList.toggle('popup_opened');
});
