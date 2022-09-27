//load data
const loadPhones = async (searchText, datalimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url);
  const data = await res.json();
  displayphones(data.data, datalimit);

}
const displayphones = (phones, datalimit) => {
  const phonesContainer = document.getElementById('phone-container');
  phonesContainer.textContent = '';
  //display 10 phones only
  if (datalimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    const showAll = document.getElementById('show-all');
    showAll.classList.remove('d-none');

  }
  else {
    showAll.classList.add('d-none')
  }
  //display all phones
  const nophone = document.getElementById('no-found-message')
  if (phones.length === 0) {
    nophone.classList.remove('d-none')
  }
  else {
    nophone.classList.add('d-none')
  }
  //display no phone found

  phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `<div class="card p-4">
<img src="${phone.image}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${phone.phone_name}</h5>
  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
    additional content. This content is a little bit longer.</p>
    <button onclick="loadphoneDetails('${phone.slug}')" href="#" class="btn btn-primary">show details</button>
</div>
</div>`;
    phonesContainer.appendChild(phoneDiv);
  });
  //stop loader
  toggleSpinner(false);
}
const processSearch = (datalimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, datalimit);
}
document.getElementById('btn-search').addEventListener('click', function () {
  //start loader
  processSearch(10)


})
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none')
  }
  else {
    loaderSection.classList.add('d-none');
  }
}
document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch();
})

const loadphoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);
}
//loadPhones();