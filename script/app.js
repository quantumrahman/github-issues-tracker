const tabs = document.querySelectorAll('.tab-btn');

tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
        const currentTab = e.target;
        
        tabs.forEach((btn) => {
            btn.classList.remove('active-tab');
        });

        currentTab.classList.add('active-tab');
    });
});