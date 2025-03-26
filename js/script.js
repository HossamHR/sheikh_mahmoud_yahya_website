document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation
    const tabs = document.querySelectorAll('.tab');
  
    function activateTab(selectedTab) {
      tabs.forEach(tab => {
        const target = tab.getAttribute('data-target');
        if (tab === selectedTab) {
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
          document.getElementById(target).hidden = false;
        } else {
          tab.classList.remove('active');
          tab.setAttribute('aria-selected', 'false');
          document.getElementById(target).hidden = true;
        }
      });
    }
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        activateTab(tab);
      });
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateTab(tab);
        }
      });
    });
  
    // Load Surahs from JSON and populate the "السور" tab
    fetch('data/surahs.json')
      .then(response => response.json())
      .then(data => {
        const surahList = document.getElementById('surah-list');
        data.forEach(surah => {
          const article = document.createElement('article');
          article.classList.add('card');
          article.setAttribute('tabindex', '0');
          article.innerHTML = `
            <h2>${surah.id}. ${surah.arabicName}</h2>
            <p>القراءة: ${surah.reader}</p>
          `;
          surahList.appendChild(article);
        });
      })
      .catch(error => console.error('Error loading surahs:', error));
  
    // Donation FAB and Modal Logic
    const donationFab = document.getElementById('donationFab');
    const donationModal = document.getElementById('donationModal');
    const donateConfirm = document.getElementById('donateConfirm');
    const donateCancel = document.getElementById('donateCancel');
    const donationAmountInput = document.getElementById('donationAmount');
  
    // Show the donation modal when FAB is clicked
    donationFab.addEventListener('click', () => {
      donationModal.style.display = 'flex';
      donationAmountInput.value = '';
      donationAmountInput.focus();
    });
  
    // Hide modal on cancel button click
    donateCancel.addEventListener('click', () => {
      donationModal.style.display = 'none';
    });
  
    // Confirm donation – for example, open a donation link with the amount
    donateConfirm.addEventListener('click', () => {
      const amount = donationAmountInput.value.trim();
      if (amount !== '') {
        // Customize the donation URL as needed
        window.open(`tel:*9*7*01061944122*${encodeURIComponent(amount)}#`, "_blank");
      }
      donationModal.style.display = 'none';
    });
  
    // Hide modal when clicking outside modal content
    donationModal.addEventListener('click', (e) => {
      if (e.target === donationModal) {
        donationModal.style.display = 'none';
      }
    });
  });
  