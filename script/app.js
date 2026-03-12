// const issuesContainer = document.getElementById('issues-container');
// const modalCloseBtn = document.getElementById('modal-close-btn');
// const issuesCount = document.getElementById('issues-count');
// const searchInt = document.getElementById('search-int');
// const modal = document.getElementById('modal');
// const body = document.getElementById('body');

// const tabs = document.querySelectorAll('.tab-btn');

// fetch function ---------------------------------------------------->
const fetchAllIssue = async () => {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const issue = await response.json();
    return issue.data;
};

const fetchSingelIssue = async (id) => {
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const issue = await response.json();
    return issue.data;
};

const fetchSearchIssue = async (search) => {
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`);
    const issue = await response.json();
    return issue.data;
};

// let issues = [];
// const loadIssues = async () => {
//     issues = await fetchAllIssue();
//     renderIssue(issues);
//     updateIssuesCount(issues);
// };

// render function ------------------------------------------------->
const renderIssue = (issue) => {
    issuesContainer.innerHTML = '';

    issue.forEach((issue) => {
        const issueCard = document.createElement('div');

        issueCard.className = `w-full min-h-[250px] bg-white border-t-3 ${issue.status === 'open' ? 'border-[#00A96E]' : issue.status === 'closed' ? 'border-[#A855F7]' : 'border-[#00A96E]'} rounded-sm cursor-pointer`;

        issueCard.onclick = async () => {
            const modalIssue = await fetchSingelIssue(issue.id);
            openModal(modalIssue);
        };

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
                                </div>`)).join('')}
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

// update function ------------------------------------------------->
const updateIssuesCount = (issue) => {
    issuesCount.textContent = '';
    issuesCount.textContent = issue.length;
};

// switcher function ----------------------------------------------->
const tabSwitcher = () => {
    tabs.forEach((tab) => {
        tab.addEventListener('click', async (e) => {
            const currentTab = e.target;
            const tabname = currentTab.dataset.tab;

            tabs.forEach((tab) => {
                tab.classList.remove('active-tab');
            });

            currentTab.classList.add('active-tab');

            let filteredIssues = [];

            if (tabname === 'all') {
                filteredIssues = issues;
            };

            if (tabname === 'open') {
                filteredIssues = issues.filter((issue) => issue.status.includes(tabname));
            };

            if (tabname === 'closed') {
                filteredIssues = issues.filter((issue) => issue.status.includes(tabname));
            };

            renderIssue(filteredIssues);
            updateIssuesCount(filteredIssues);
        });
    });
};

// const searchIssue = () => {
//     searchInt.addEventListener('input', async (e) => {
//         const searchValue = e.target.value.trim().toLowerCase();

//         if (!searchValue) {
//             renderIssue(issues);
//             updateIssuesCount(issues);
//             return;
//         };

//         const searchResult = await fetchSearchIssue(searchValue);
//         renderIssue(searchResult);
//         updateIssuesCount(searchResult);
//     });
// };

// const openModal = (issue) => {
//     body.classList.add('overflow-hidden');

//     modal.classList.remove('hidden');
//     modal.classList.add('flex');

//     const authorName = formatName(issue.author);
//     const assigneeName = formatName(issue.assignee);
//     const openOrCloseDate = new Date(issue.createdAt).toLocaleDateString();

//     const title = document.getElementById('title');
//     const badge = document.getElementById('badge');
//     const badgeText = document.getElementById('badge-text');
//     const openOrCloseText = document.getElementById('oc-text');
//     const openOrCloseName = document.getElementById('author-name');
//     const dateText = document.getElementById('date-text');
//     const desText = document.getElementById('des-text');
//     const assigneeText = document.getElementById('assignee-text');
//     const priorityBadge = document.getElementById('priority-badge');
//     const priorityText = document.getElementById('priority-text');
//     const tagContainer = document.getElementById('tag-container');

//     title.textContent = issue.title;
//     desText.textContent = issue.description;
//     dateText.textContent = openOrCloseDate;
//     openOrCloseName.textContent = authorName;
//     assigneeText.textContent = assigneeName;
//     priorityText.textContent = issue.priority;

//     badgeText.textContent = issue.status === 'open' ? 'Opened' : 'Closed';
//     openOrCloseText.textContent = issue.status === 'open' ? 'Opened' : 'Closed';

//     badge.classList.toggle('bg-[#00A96E]', issue.status === 'open');
//     badge.classList.toggle('bg-[#A855F7]', issue.status === 'closed');

//     const priorityColors = {
//         high: 'bg-[#EF4444]',
//         medium: 'bg-[#F59E0B]',
//         low: 'bg-[#9CA3AF]'
//     };

//     priorityBadge.classList.remove('bg-[#EF4444]', 'bg-[#F59E0B]', 'bg-[#9CA3AF]');
//     priorityBadge.classList.add(priorityColors[issue.priority]);

//     tagContainer.innerHTML = '';
//     issue.labels.forEach((label) => {
//         const tagDiv = document.createElement('div');

//         tagDiv.className = `py-1.5 px-2 flex items-center justify-center gap-1 border ${label === 'bug' ? 'bg-[#FEECEC] border-[#FECACA]' : label === 'help wanted' ? 'bg-[#FFF8DB] border-[#FDE68A]' : label === 'good first issue' ? 'bg-[#DFF5E7] border-[#7EE2A8]' : label === 'enhancement' ? 'bg-[#DDF4FF] border-[#80CFFF]' : label === 'documentation' ? 'bg-[#F1E9FF] border-[#D8B9FF]' : 'bg-[#FEECEC] border-[#FECACA]'} rounded-full`;
//         tagDiv.innerHTML = `
//             <img src="./assets/${label === 'bug' ? 'bug' : label === 'help wanted' ? 'help' : label === 'good first issue' ? 'good' : label === 'enhancement' ? 'enhancement' : label === 'documentation' ? 'document' : 'bug'}-icon.png" alt="${label} icon" class="w-3 h-3">
//             <span class="font-geist text-xs ${label === 'bug' ? 'text-[#EF4444]' : label === 'help wanted' ? 'text-[#D97706]' : label === 'good first issue' ? 'text-[#1A7F37]' : label === 'enhancement' ? 'text-[#0969DA]' : label === 'documentation' ? 'text-[#8250DF]' : 'text-[#EF4444]'} font-medium uppercase">${label}</span>
//         `;

//         tagContainer.appendChild(tagDiv);
//     });
// };

// const formatName = (name) => {
//     if (!name) {
//         return 'Unknown';
//     };
    
//     return name
//         .split('_')
//         .map((word) => word[0]
//         .toUpperCase() + word.slice(1))
//         .join(' ');
// };

// const modalClosed = () => {
//     modalCloseBtn.addEventListener('click', (e) => {
//         modal.classList.remove('flex');
//         modal.classList.add('hidden');

//         body.classList.remove('overflow-hidden');
//     });
// };

// tabSwitcher();
// modalClosed();
// searchIssue();
// loadIssues();