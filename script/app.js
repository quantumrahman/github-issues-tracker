const tabs = document.querySelectorAll('.tab-btn');

const fetchAllIssues = async () => {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await response.json();

    return data;
};

let issues = [];
const loadAllIssues = async () => {
    issues = await fetchAllIssues();
};

tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
        const currentTab = e.target;
        const tabname = currentTab.dataset.tab;

        tabs.forEach((btn) => {
            btn.classList.remove('active-tab');
        });
    });
});

loadAllIssues();