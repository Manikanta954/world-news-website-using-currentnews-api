document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'oqv0U4Ofoi-YGGUnZ_m0KfTVLk7FG4TPXyyUGOSU0TqAfc_T';
    const newsContainer = document.getElementById('news-container');
    const locationButtons = document.querySelectorAll('#location-buttons button');
    const categoryButtons = document.querySelectorAll('#category-buttons button');
    const languageButtons = document.querySelectorAll('#language-buttons button');
  
    let selectedLocation = '';
    let selectedCategory = '';
    let selectedLanguage = '';
  
    const fetchNews = () => {
      let url = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`;
  
      if (selectedLocation) {
        url += `&country=${selectedLocation}`;
      }
     
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
  
      if (selectedLanguage) {
        url += `&language=${selectedLanguage}`;
      }
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          newsContainer.innerHTML = '';
          const articles = data.news;
  
          articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'card';
  
            const img = document.createElement('img');
            img.src = article.image || 'https://via.placeholder.com/300x180';
            card.appendChild(img);
  
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
  
            const title = document.createElement('h3');
            title.className = 'card-title';
            title.textContent = article.title;
            cardContent.appendChild(title);
  
            const description = document.createElement('p');
            description.className = 'card-description';
            description.textContent = article.description;
            cardContent.appendChild(description);
  
            const link = document.createElement('a');
            link.href = article.url;
            link.textContent = 'Read more';
            cardContent.appendChild(link);
  
            card.appendChild(cardContent);
            newsContainer.appendChild(card);
          });
        })
        .catch(error => console.error('Error fetching news:', error));
    };
  
    const handleButtonClick = (buttonGroup, buttonType) => {
      buttonGroup.forEach(button => {
        button.addEventListener('click', () => {
          buttonGroup.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
  
          if (buttonType === 'location') {
            selectedLocation = button.getAttribute('data-location');
          } else if (buttonType === 'category') {
            selectedCategory = button.getAttribute('data-category');
          } else if (buttonType === 'language') {
            selectedLanguage = button.getAttribute('data-language');
          }
  
          fetchNews();
        });
      });
    };
  
    // Initialize the default button state
    locationButtons[0].classList.add('active');
    categoryButtons[0].classList.add('active');
    languageButtons[0].classList.add('active');
  
    handleButtonClick(locationButtons, 'location');
    handleButtonClick(categoryButtons, 'category');
    handleButtonClick(languageButtons, 'language');
  
    // Fetch initial news
    fetchNews();
});
  