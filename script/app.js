const tabs = document.querySelectorAll('.tab-btn');

const issuesContainer = document.getElementById('issues-container');
const issuesCount = document.getElementById('issues-count');

const fetchAllIssues = async () => {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await response.json();

    return data;
};

const renderIssues = (issue) => {
    issuesContainer.innerHTML = '';

    issue.forEach((issue) => {
        const issueCard = document.createElement('div');

        issueCard.className = `w-full min-h-[250px] bg-white border-t-3 ${issue.status === 'open' ? 'border-[#00A96E]' : issue.status === 'closed' ? 'border-[#A855F7]' : 'border-[#00A96E]'} rounded-sm cursor-pointer`;
        issueCard.innerHTML = `
            <div class="p-4 border-b border-[#E4E4E7]">
                <div class="w-full flex items-center justify-between">
                    ${issue.status === 'open'
                ?
                `<div class="w-6 h-6">
                            <img src="./assets/open-status.png" alt="open icon">
                        </div>`
                : issue.status === 'closed'
                    ?
                    `<div class="w-6 h-6">
                            <img src="./assets/closed-status.png" alt="closed icon">
                        </div>`
                    :
                    `<div class="w-6 h-6">
                            <img src="./assets/open-status.png" alt="open icon">
                        </div>`
            }
                    ${issue.priority === 'high'
                ?
                `<div class="w-full max-w-20 py-1.5 px-[25px] bg-[#FEECEC] rounded-full flex items-center justify-center">
                            <span class="font-geist text-xs text-[#EF4444] font-medium uppercase">high</span>
                        </div>`
                : issue.priority === 'medium'
                    ?
                    `<div class="w-full max-w-20 py-1.5 px-[25px] bg-[#FFF6D1] rounded-full flex items-center justify-center">
                            <span class="font-geist text-xs text-[#F59E0B] font-medium uppercase">medium</span>
                        </div>`
                    : issue.priority === 'low'
                        ?
                        `<div class="w-full max-w-20 py-1.5 px-[25px] bg-[#EEEFF2] rounded-full flex items-center justify-center">
                            <span class="font-geist text-xs text-[#9CA3AF] font-medium uppercase">low</span>
                        </div>`
                        :
                        `<div class="w-full max-w-20 py-1.5 px-[25px] bg-[#FEECEC] rounded-full flex items-center justify-center">
                            <span class="font-geist text-xs text-[#EF4444] font-medium uppercase">high</span>
                        </div>`
            }
                </div>
                <div class="w-full flex items-center flex-col gap-3 mt-3">
                    <div class="w-full space-y-2">
                        <h1 class="font-geist text-sm text-[#1F2937] font-semibold">${issue.title}</h1>
                        <p class="font-geist text-xs text-[#64748B] font-normal">${issue.description}</p>
                    </div>
                    <div class="w-full flex flex-wrap gap-1">
                        ${issue.labels.map((label) => (
                `<div class="py-1.5 px-2 flex items-center justify-center gap-1  border ${label === 'bug' ? 'bg-[#FEECEC] border-[#FECACA]' : label === 'help wanted' ? 'bg-[#FFF8DB] border-[#FDE68A] ' : label === 'enhancement' ? 'bg-[#DDF4FF] border-[#80CFFF]' : label === 'good first issue' ? 'bg-[#DFF5E7] border-[#7EE2A8]' : label === 'documentation' ? 'bg-[#F1E9FF] border-[#D8B9FF]' : 'bg-[#FEECEC] border-[#FECACA]'} rounded-full">
                                ${label === 'bug'
                    ?
                    `<img src="./assets/bug-icon.png" alt="bug icon" class="w-3 h-3">`
                    : label === 'help wanted'
                        ?
                        `<img src="./assets/help-icon.png" alt="help icon" class="w-3 h-3">`
                        : label === 'enhancement'
                            ?
                            `<img src="./assets/enhancement-icon.png" alt="enhancement icon" class="w-3 h-3">`
                            : label === 'good first issue'
                                ?
                                `<img src="./assets/good-icon.png" alt="good icon" class="w-3 h-3">`
                                : label === 'documentation'
                                    ?
                                    `<img src="./assets/document-icon.png" alt="documentation icon" class="w-3 h-3">`
                                    :
                                    `<img src="./assets/bug-icon.png" alt="bug icon" class="w-3 h-3">`
                }
                                <span class="font-geist text-xs ${label === 'bug' ? 'text-[#EF4444]' : label === 'help wanted' ? 'text-[#D97706]' : label === 'enhancement' ? 'text-[#0969DA]' : label === 'good first issue' ? 'text-[#1A7F37]' : label === 'documentation' ? 'text-[#8250DF]' : 'text-[#EF4444]'} font-medium uppercase">${label}</span>
                            </div>`
            )).join('')}
                    </div>
                </div>
            </div>
            <div class="w-full p-4 flex justify-center flex-col gap-2">
                <p class="font-geist text-xs text-[#64748B] font-normal">#<span>${issue.id}</span> by ${issue.author}</p>
                <span class="font-geist text-xs text-[#64748B] font-normal">${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
        `;

        issuesContainer.appendChild(issueCard);
    });
};

let issues = [];
const loadAllIssues = async () => {
    issues = await fetchAllIssues();
    renderIssues(issues.data);
    updateDashBoard(issues.data);
};

const updateDashBoard = (issue) => {
    issuesCount.textContent = '';
    issuesCount.textContent = issue.length
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