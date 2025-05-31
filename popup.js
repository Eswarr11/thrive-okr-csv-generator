document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const apiKeyInput = document.getElementById('apiKey');
  const saveApiKeyBtn = document.getElementById('saveApiKey');
  const apiKeyStatus = document.getElementById('apiKeyStatus');
  const hierarchyDepthInput = document.getElementById('hierarchyDepth');
  const childGoalsInput = document.getElementById('childGoals');
  const tasksPerGoalInput = document.getElementById('tasksPerGoal');
  const totalRowsInput = document.getElementById('totalRows');
  const generateBtn = document.getElementById('generate');
  const downloadPeopleDirectoryBtn = document.getElementById('downloadPeopleDirectory');
  const statusDiv = document.getElementById('status');
  const progressContainer = document.getElementById('progress-container');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const loaderOverlay = document.getElementById('loader-overlay');

  // People Directory CSV data
  const peopleDirectoryCSV = `Employee ID,Name,Email,Job Title,Department,Is Dept Head,Manager Email
E456,Nikihl Ponduri,eswar.a+123@surveysparrow.com,Engineering Manager,Engineering,,eswar.a+234@surveysparrow.com
E324,Sakthi Prasath,eswar.a+456@surveysparrow.com,Associate Architect,Engineering,,eswar.a+123@surveysparrow.com
E192,Bharathi Kannan,eswar.a+789@surveysparrow.com,Team Lead,Engineering,,eswar.a+123@surveysparrow.com
E360,Balaji CM,eswar.a+234@surveysparrow.com,CTO,Engineering,Yes,eswar.a+111@surveysparrow.com
E472,Arun Dev,eswar.a+567@surveysparrow.com,Director - Quality Engineering,Quality Engineering,Yes,eswar.a+111@surveysparrow.com
E204,Sneha,eswar.a+891@surveysparrow.com,QA Automation Engineer,Engineering,,eswar.a+123@surveysparrow.com
E336,Mahendra Malliboina,eswar.a+242@surveysparrow.com,QA Automation Engineer,Engineering,,eswar.a+123@surveysparrow.com
E468,Eswar A,eswar.a+333@surveysparrow.com,QA - Intern,Engineering,,eswar.a+123@surveysparrow.com
E600,Santhosh Kumar,eswar.a+444@surveysparrow.com,QA - Intern,Engineering,,eswar.a+123@surveysparrow.com
E732,Harini,eswar.a+555@surveysparrow.com,QA - Intern,Engineering,,eswar.a+123@surveysparrow.com
E864,Vignesh Vinod,eswar.a+666@surveysparrow.com,QA - Intern,Engineering,,eswar.a+123@surveysparrow.com
E996,Kevin Jacob,eswar.a+777@surveysparrow.com,Team Lead,Engineering,,eswar.a+123@surveysparrow.com
E128,Ram,eswar.a+888@surveysparrow.com,Team Lead,Engineering,,eswar.a+123@surveysparrow.com
E260,Flavian Diol,eswar.a+999@surveysparrow.com,Product Developer,Engineering,,eswar.a+123@surveysparrow.com
E392,Veroni Shewtha,eswar.a+112@surveysparrow.com,Product Developer,Engineering,,eswar.a+123@surveysparrow.com
E524,Ayush Tripathy,eswar.a+223@surveysparrow.com,Product Developer,Engineering,,eswar.a+123@surveysparrow.com
E656,Krishna Chaitanya Dutt,eswar.a+334@surveysparrow.com,Product Developer,Engineering,,eswar.a+123@surveysparrow.com
E788,Manoj Jeyaraman,eswar.a+445@surveysparrow.com,Senior Accounts Producer,Design,,eswar.a+556@surveysparrow.com
E920,Shammer,eswar.a+556@surveysparrow.com,QA Automation Engineer,Engineering,,eswar.a+123@surveysparrow.com
E252,Shihab Muhammed,eswar.a+111@surveysparrow.com,CEO,,,
E384,Ijaz Ahamad,eswar.a+222@surveysparrow.com,Associate Architect,Engineering,,eswar.a+234@surveysparrow.com
E516,Anand,eswar.a+335@surveysparrow.com,Head of Design,Design,Yes,eswar.a+111@surveysparrow.com
E648,Vipin Thomas,eswar.a+446@surveysparrow.com,Head of Sales,Sales,Yes,eswar.a+111@surveysparrow.com
E780,Sharmila Banu,eswar.a+557@surveysparrow.com,Sales Executive,Sales,,eswar.a+446@surveysparrow.com
E912,Niranjan,eswar.a+668@surveysparrow.com,DevOps - Intern,DevOps,,eswar.a+779@surveysparrow.com
E1044,Aswin Kumar,eswar.a+779@surveysparrow.com,Senior DevOps Engineer,DevOps,Yes,eswar.a+123@surveysparrow.com
E1176,Aldas Francis,eswar.a+890@surveysparrow.com,QA Automation Engineer,Quality Engineering,,eswar.a+992@surveysparrow.com
E1308,Jiss George,eswar.a+992@surveysparrow.com,Staff Automation Engineer,Quality Engineering,,eswar.a+567@surveysparrow.com
E1440,Arshad Riyas,eswar.a+1001@surveysparrow.com,Senior UI/UX Designer,Design,,eswar.a+335@surveysparrow.com
E1572,Vaishnavi,eswar.a+1002@surveysparrow.com,Staff UI/UX Designer,Design,,eswar.a+335@surveysparrow.com
E1704,Vishnu Chandru Babu,eswar.a+1003@surveysparrow.com,Lead QA Automation Engineer,Quality Engineering,,eswar.a+567@surveysparrow.com
E1836,Sridhar,eswar.a+1004@surveysparrow.com,Lead Frontend Developer,Engineering,,eswar.a+123@surveysparrow.com
E1968,Eugene,eswar.a+1005@surveysparrow.com,Senior Product Manager,Product,Yes,eswar.a+111@surveysparrow.com
E2100,Aarohan,eswar.a+1006@surveysparrow.com,Associate Product Manager,Product,,eswar.a+1005@surveysparrow.com
E2232,Saniya,eswar.a+1007@surveysparrow.com,Associate Product Manager,Product,,eswar.a+1005@surveysparrow.com
E2364,Goal Admin,eswar.a+1008@surveysparrow.com,Goal Admin,Administration,,eswar.a+111@surveysparrow.com
E2496,Admin,eswar.a+1009@surveysparrow.com,Admin,Administration,,eswar.a+111@surveysparrow.com
E2628,Goal Writer,eswar.a+1010@surveysparrow.com,Goal Writer,Administration,,eswar.a+111@surveysparrow.com`;

  // Manager Reportees CSV data
  const managerReporteesCSV = `Manager Email,Manager Name,Reportee Name,Reportee Email
eswar.a+234@surveysparrow.com,Nikihl Ponduri,Ijaz Ahamad,eswar.a+222@surveysparrow.com
eswar.a+234@surveysparrow.com,Nikihl Ponduri,Nikihl Ponduri,eswar.a+123@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Sakthi Prasath,eswar.a+456@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Bharathi Kannan,eswar.a+789@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Sneha,eswar.a+891@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Mahendra Malliboina,eswar.a+242@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Eswar A,eswar.a+333@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Santhosh Kumar,eswar.a+444@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Harini,eswar.a+555@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Vignesh Vinod,eswar.a+666@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Kevin Jacob,eswar.a+777@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Ram,eswar.a+888@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Flavian Diol,eswar.a+999@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Veroni Shewtha,eswar.a+112@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Ayush Tripathy,eswar.a+223@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Krishna Chaitanya Dutt,eswar.a+334@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Shammer,eswar.a+556@surveysparrow.com
eswar.a+123@surveysparrow.com,Nikihl Ponduri,Sridhar,eswar.a+1004@surveysparrow.com
eswar.a+111@surveysparrow.com,Shihab Muhammed,Balaji CM,eswar.a+234@surveysparrow.com
eswar.a+111@surveysparrow.com,Shihab Muhammed,Arun Dev,eswar.a+567@surveysparrow.com
eswar.a+111@surveysparrow.com,Shihab Muhammed,Anand,eswar.a+335@surveysparrow.com
eswar.a+111@surveysparrow.com,Shihab Muhammed,Vipin Thomas,eswar.a+446@surveysparrow.com
eswar.a+111@surveysparrow.com,Shihab Muhammed,Eugene,eswar.a+1005@surveysparrow.com
eswar.a+111@surveysparrow.com,Shihab Muhammed,Goal Admin,eswar.a+1008@surveysparrow.com
eswar.a+111@surveysparrow.com,Shihab Muhammed,Admin,eswar.a+1009@surveysparrow.com
eswar.a+111@surveysparrow.com,Shihab Muhammed,Goal Writer,eswar.a+1010@surveysparrow.com
eswar.a+556@surveysparrow.com,Manoj Jeyaraman,Manoj Jeyaraman,eswar.a+445@surveysparrow.com
eswar.a+446@surveysparrow.com,Vipin Thomas,Sharmila Banu,eswar.a+557@surveysparrow.com
eswar.a+567@surveysparrow.com,Arun Dev,Jiss George,eswar.a+992@surveysparrow.com
eswar.a+567@surveysparrow.com,Arun Dev,Vishnu Chandru Babu,eswar.a+1003@surveysparrow.com
eswar.a+335@surveysparrow.com,Anand,Arshad Riyas,eswar.a+1001@surveysparrow.com
eswar.a+335@surveysparrow.com,Anand,Vaishnavi,eswar.a+1002@surveysparrow.com
eswar.a+1005@surveysparrow.com,Eugene,Aarohan,eswar.a+1006@surveysparrow.com
eswar.a+1005@surveysparrow.com,Eugene,Saniya,eswar.a+1007@surveysparrow.com
eswar.a+779@surveysparrow.com,Aswin Kumar,Niranjan,eswar.a+668@surveysparrow.com
eswar.a+992@surveysparrow.com,Jiss George,Aldas Francis,eswar.a+890@surveysparrow.com`;

  // Department Heads and Their Members
  const deptHeadMembersCSV = `Department Head Name,Department Head Email,Department,Member Name,Member Email
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Nikihl Ponduri,eswar.a+123@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Sakthi Prasath,eswar.a+456@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Bharathi Kannan,eswar.a+789@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Balaji CM,eswar.a+234@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Sneha,eswar.a+891@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Mahendra Malliboina,eswar.a+242@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Eswar A,eswar.a+333@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Santhosh Kumar,eswar.a+444@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Harini,eswar.a+555@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Vignesh Vinod,eswar.a+666@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Kevin Jacob,eswar.a+777@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Ram,eswar.a+888@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Flavian Diol,eswar.a+999@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Ayush Tripathy,eswar.a+223@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Krishna Chaitanya Dutt,eswar.a+334@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Shammer,eswar.a+556@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Ijaz Ahamad,eswar.a+222@surveysparrow.com
Balaji CM,eswar.a+234@surveysparrow.com,Engineering,Sridhar,eswar.a+1004@surveysparrow.com
Arun Dev,eswar.a+567@surveysparrow.com,Quality Engineering,Arun Dev,eswar.a+567@surveysparrow.com
Arun Dev,eswar.a+567@surveysparrow.com,Quality Engineering,Aldas Francis,eswar.a+890@surveysparrow.com
Arun Dev,eswar.a+567@surveysparrow.com,Quality Engineering,Jiss George,eswar.a+992@surveysparrow.com
Arun Dev,eswar.a+567@surveysparrow.com,Quality Engineering,Vishnu Chandru Babu,eswar.a+1003@surveysparrow.com
Anand,eswar.a+335@surveysparrow.com,Design,Manoj Jeyaraman,eswar.a+445@surveysparrow.com
Anand,eswar.a+335@surveysparrow.com,Design,Anand,eswar.a+335@surveysparrow.com
Anand,eswar.a+335@surveysparrow.com,Design,Arshad Riyas,eswar.a+1001@surveysparrow.com
Anand,eswar.a+335@surveysparrow.com,Design,Vaishnavi,eswar.a+1002@surveysparrow.com
Vipin Thomas,eswar.a+446@surveysparrow.com,Sales,Vipin Thomas,eswar.a+446@surveysparrow.com
Vipin Thomas,eswar.a+446@surveysparrow.com,Sales,Sharmila Banu,eswar.a+557@surveysparrow.com
Aswin Kumar,eswar.a+779@surveysparrow.com,DevOps,Niranjan,eswar.a+668@surveysparrow.com
Aswin Kumar,eswar.a+779@surveysparrow.com,DevOps,Aswin Kumar,eswar.a+779@surveysparrow.com
Eugene,eswar.a+1005@surveysparrow.com,Product,Eugene,eswar.a+1005@surveysparrow.com
Eugene,eswar.a+1005@surveysparrow.com,Product,Aarohan,eswar.a+1006@surveysparrow.com
Eugene,eswar.a+1005@surveysparrow.com,Product,Saniya,eswar.a+1007@surveysparrow.com`;

  // Global counters for incremental naming
  let globalGoalCounter = 1;
  let globalTaskCounter = 1;

  // Goal levels in hierarchical order
  const GOAL_LEVELS = ['Organization', 'Department', 'Team', 'Individual'];

  // Sample goal types
  const goalTypes = [
    ['Improve System Performance', 'Optimize Database'],
    ['Enhance Security', 'Implement Authentication'],
    ['Update UI/UX', 'Redesign Interface'],
    ['Fix Bugs', 'Implement Testing'],
    ['Optimize API', 'Add Caching'],
    ['Improve Documentation', 'Write Docs'],
    ['Enhance Monitoring', 'Set up Alerts'],
    ['Update Dependencies', 'Upgrade Packages'],
    ['Improve Code Quality', 'Refactor Code'],
    ['Add Features', 'Implement Features']
  ];

  // Download People Directory CSV
  downloadPeopleDirectoryBtn.addEventListener('click', () => {
    downloadCSV(peopleDirectoryCSV, 'people_directory.csv');
    showStatus('People Directory CSV downloaded successfully!', 'success');
  });

  // Load saved API key
  chrome.storage.local.get(['openaiApiKey'], (result) => {
    if (result.openaiApiKey) {
      apiKeyInput.value = result.openaiApiKey;
      apiKeyStatus.textContent = '✓ API key saved';
      apiKeyStatus.className = 'success';
    }
  });

  // Save API key
  saveApiKeyBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      chrome.storage.local.set({ openaiApiKey: apiKey }, () => {
        apiKeyStatus.textContent = '✓ API key saved';
        apiKeyStatus.className = 'success';
      });
    } else {
      chrome.storage.local.remove(['openaiApiKey'], () => {
        apiKeyStatus.textContent = 'Using simple naming (no API key)';
        apiKeyStatus.className = '';
      });
    }
  });

  // Show loader overlay
  function showLoader() {
    loaderOverlay.classList.add('active');
  }

  // Hide loader overlay
  function hideLoader() {
    loaderOverlay.classList.remove('active');
  }

  // Handle generate button click
  generateBtn.addEventListener('click', async () => {
    // Reset global counters for each new generation
    globalGoalCounter = 1;
    globalTaskCounter = 1;
    
    // Get input values
    const apiKey = apiKeyInput.value.trim();
    const hierarchyDepth = parseInt(hierarchyDepthInput.value) || 3;
    const childGoalsPerParent = parseInt(childGoalsInput.value) || 2;
    const tasksPerGoal = parseInt(tasksPerGoalInput.value) || 0;
    const targetRows = parseInt(totalRowsInput.value) || 500;

    // Validate inputs
    if (hierarchyDepth < 1 || hierarchyDepth > 4) {
        showStatus('Hierarchy depth must be between 1 and 4', 'error');
        return;
    }

    if (childGoalsPerParent < 1) {
        showStatus('Child goals must be at least 1', 'error');
        return;
    }

    if (tasksPerGoal < 0) {
        showStatus('Tasks per goal must be non-negative', 'error');
        return;
    }

    if (targetRows > 10000) {
        showStatus('Target rows cannot exceed 10,000 due to browser limitations', 'error');
        return;
    }

    // Show loader and progress
    showLoader();
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
    showStatus(`Generating goals and tasks using ${apiKey ? 'AI-generated' : 'incremental numbered'} titles...`, 'info');
    generateBtn.disabled = true;
    generateBtn.style.opacity = '0.7';
    generateBtn.style.cursor = 'not-allowed';

    try {
        // Configure the generation
        const config = {
            hierarchyDepth,
            childGoalsPerParent,
            tasksPerGoal,
            targetRows,
            useOpenAI: !!apiKey
        };

        // Add a timeout to prevent hanging if generation takes too long
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Generation timed out after 5 minutes'));
            }, 5 * 60 * 1000); // 5 minutes timeout
        });

        // Progress update interval
        let lastProgressUpdate = 0;
        const progressInterval = setInterval(() => {
            if (lastProgressUpdate < 90) {
                lastProgressUpdate += 1;
                updateProgress(lastProgressUpdate);
            }
        }, 3000); // Update progress every 3 seconds

        // Generate the CSV data with timeout protection
        try {
            const csvData = await Promise.race([
                generateCSV(config, apiKey, (percent) => {
                    lastProgressUpdate = percent;
                    updateProgress(percent);
                }),
                timeoutPromise
            ]);
            
            clearInterval(progressInterval);
            
            // Validate the generated data has enough rows
            const rowCount = csvData.split('\n').length - 2; // -2 for header and empty line at end
            
            if (rowCount < 5) {
                showStatus(`Error: Only generated ${rowCount} rows. Please try again with different parameters.`, 'error');
            } else if (rowCount < targetRows * 0.5) {
                // If we've generated at least some rows but less than half the target, still provide the file
                downloadCSV(csvData, 'goals_and_tasks.csv');
                showStatus(`Warning: Only generated ${rowCount} rows (${Math.round(rowCount / targetRows * 100)}% of target). CSV file has been downloaded.`, 'info');
            } else {
                // Success - we generated most or all of the target rows
                downloadCSV(csvData, 'goals_and_tasks.csv');
                showStatus(`CSV file generated successfully with ${rowCount} rows!`, 'success');
            }
        } catch (error) {
            clearInterval(progressInterval);
            throw error; // Re-throw to be handled by the outer catch
        }
    } catch (error) {
        console.error('Error generating CSV:', error);
        showStatus(`Error: ${error.message}. Please try again or reduce the target row count.`, 'error');
    } finally {
        // Hide loader after download
        setTimeout(hideLoader, 500);
        generateBtn.disabled = false;
        generateBtn.style.opacity = '1';
        generateBtn.style.cursor = 'pointer';
    }
  });

  // Helper function to show status messages
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = 'status';
    
    if (type === 'error') {
      statusDiv.classList.add('error');
    } else if (type === 'success') {
      statusDiv.classList.add('success');
    } else if (type === 'info') {
      statusDiv.classList.add('info');
    }
  }

  // Helper function to update progress bar
  function updateProgress(percent) {
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${Math.round(percent)}%`;
    
    if (progressContainer.style.display !== 'block') {
      progressContainer.style.display = 'block';
    }
  }

  // Function to download the CSV file
  function downloadCSV(csvData, filename) {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Generate random progress value between start and target
  function generateProgress(start, target) {
    return Math.floor(Math.random() * (target - start + 1)) + start;
  }

  // Date utilities
  const dateUtils = {
    getFormattedDate() {
      const date = new Date();
      return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    },
    
    getFutureDueDate(monthsAhead = 3) {
      const date = new Date();
      date.setMonth(date.getMonth() + monthsAhead);
      return date.toISOString().split('T')[0];
    }
  };

  // Helper function to get owner by role that matches the goal level
  function getOwnerForLevel(level) {
    // Get all users that can own goals at this level
    const eligibleOwners = userEmails.owners.filter(owner => 
      owner.assignableLevels.includes(level)
    );
    
    // If no eligible owners found, return the organization head
    if (eligibleOwners.length === 0) {
      return userEmails.owners.find(owner => owner.role === 'Organization Head') || 
             userEmails.owners[0];
    }
    
    // Shuffle the eligible owners array to increase randomness
    const shuffledOwners = [...eligibleOwners].sort(() => Math.random() - 0.5);
    
    // Return a random owner from eligible ones (with better randomization)
    const randomIndex = Math.floor(Math.random() * shuffledOwners.length);
    const owner = shuffledOwners[randomIndex];
    
    return owner;
  }

  // Get a random creator based on goal level and permissions
  function getRandomCreatorForLevel(level) {
    let possibleCreators;
    
    switch (level) {
      case 'Organization':
        // Only Organization Head can create Organization level goals
        possibleCreators = userEmails.owners.filter(u => u.role === 'Organization Head');
        break;
      case 'Department':
        // Organization Head, Department Heads, and Department Head & Manager can create Department goals
        possibleCreators = userEmails.owners.filter(u => 
          u.role === 'Organization Head' || 
          u.role === 'Department Head' || 
          u.role === 'Department Head & Manager'
        );
        break;
      case 'Team':
        // Organization Head, Department Head & Manager, and Manager can create Team goals
        possibleCreators = userEmails.owners.filter(u => 
          u.role === 'Organization Head' || 
          u.role === 'Department Head & Manager' || 
          u.role === 'Manager'
        );
        break;
      case 'Individual':
        // All manager types can create Individual goals
        possibleCreators = userEmails.owners.filter(u => 
          u.role === 'Organization Head' || 
          u.role === 'Department Head' || 
          u.role === 'Department Head & Manager' || 
          u.role === 'Manager'
        );
        break;
      default:
        // Default to Organization Head
        possibleCreators = userEmails.owners.filter(u => u.role === 'Organization Head');
    }
    
    // If no eligible creators, use Organization Head
    if (possibleCreators.length === 0) {
      return userRoles.orgHead;
    }
    
    // Shuffle to increase randomness
    const shuffledCreators = [...possibleCreators].sort(() => Math.random() - 0.5);
    
    // Return a random creator
    const randomIndex = Math.floor(Math.random() * shuffledCreators.length);
    return shuffledCreators[randomIndex].email;
  }

  // Function to generate a goal name using OpenAI or incremental numbering
  async function generateGoalName(apiKey, typeIndex, index, level, useOpenAI = true) {
    // If no API key, use incremental goal names
    if (!apiKey) {
        const goalNumber = globalGoalCounter++;
        return `Goal ${goalNumber}: ${goalTypes[typeIndex][0]} ${Math.floor(index/5) + 1}`;
    }

    // If API key is provided, always try to use OpenAI (ignore useOpenAI parameter)
    try {
        // Add exponential backoff retry logic for API calls
        let retryCount = 0;
        const maxRetries = 3;
        let delay = 1000; // Start with 1 second delay
        
        while (retryCount < maxRetries) {
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system",
                                content: `You're a tester who is testing the goals module, according to the requirements, generate a ${level} level testing goal name, the name should be unique and meaningful and should not be repetitive give the name randomly in between 50 to 600 characters. Return only the goal name, nothing else.make sure there are no special characters in the goal name.`
                            },
                            {
                                role: "user",
                                content: `Generate a ${level} level business goal name related to ${goalTypes[typeIndex][0]} ${Math.floor(index/10) + 1}`
                            }
                        ],
                        temperature: 0.7,
                        max_tokens: 50
                    }),
                    // Add timeout to fetch request
                    signal: AbortSignal.timeout(7000) // 7 seconds timeout
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    // Check for rate limit errors (429)
                    if (response.status === 429) {
                        console.warn('Rate limited by OpenAI API, retrying after delay...');
                        retryCount++;
                        if (retryCount < maxRetries) {
                            await new Promise(resolve => setTimeout(resolve, delay));
                            delay *= 2; // Exponential backoff
                            continue;
                        }
                    }
                    throw new Error(errorData.error?.message || `API error: ${response.status}`);
                }

                const data = await response.json();
                const goalName = data.choices[0].message.content.trim();
                
                // Verify we got a valid goal name
                if (!goalName || goalName.length < 3) {
                    throw new Error('Invalid goal name returned from API');
                }
                
                console.log(`Generated goal name from OpenAI: ${goalName}`);
                return goalName;
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.warn('Fetch request timed out, retrying...');
                } else {
                    console.error('API call error:', error);
                }
                
                retryCount++;
                if (retryCount < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; // Exponential backoff
                } else {
                    throw error; // Re-throw after max retries
                }
            }
        }
        
        throw new Error('Max retries exceeded');
    } catch (error) {
        console.error('Error generating goal name with OpenAI:', error);
        // Fallback to incremental goal name only if OpenAI fails
        const goalNumber = globalGoalCounter++;
        return `Goal ${goalNumber}: ${goalTypes[typeIndex][0]} ${Math.floor(index/5) + 1}`;
    }
  }

  // Function to generate a task name using OpenAI or incremental numbering
  async function generateTaskName(apiKey, typeIndex, goalIndex, goalName, level, useOpenAI = true) {
    // If no API key, use incremental task names
    if (!apiKey) {
        const taskNumber = globalTaskCounter++;
        return `Task ${taskNumber}: ${goalTypes[typeIndex][1]} for ${goalName}`;
    }

    // If API key is provided, always try to use OpenAI (ignore useOpenAI parameter)
    try {
        // Add exponential backoff retry logic for API calls
        let retryCount = 0;
        const maxRetries = 3;
        let delay = 1000; // Start with 1 second delay
        
        while (retryCount < maxRetries) {
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system",
                                content: `You're a tester who is testing the goals module, according to the requirements, generate a ${level} level testing task name, the name should be unique and meaningful and should not be repetitive give the name randomly in between 50 to 600 characters. Return only the task name, nothing else.make sure there are no special characters in the task name.`
                            },
                            {
                                role: "user",
                                content: `Generate a task name for the ${level} level goal "${goalName}" related to ${goalTypes[typeIndex][1]}`
                            }
                        ],
                        temperature: 0.7,
                        max_tokens: 50
                    }),
                    // Add timeout to fetch request
                    signal: AbortSignal.timeout(7000) // 7 seconds timeout
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    // Check for rate limit errors (429)
                    if (response.status === 429) {
                        console.warn('Rate limited by OpenAI API, retrying after delay...');
                        retryCount++;
                        if (retryCount < maxRetries) {
                            await new Promise(resolve => setTimeout(resolve, delay));
                            delay *= 2; // Exponential backoff
                            continue;
                        }
                    }
                    throw new Error(errorData.error?.message || `API error: ${response.status}`);
                }

                const data = await response.json();
                const taskName = data.choices[0].message.content.trim();
                
                // Verify we got a valid task name
                if (!taskName || taskName.length < 3) {
                    throw new Error('Invalid task name returned from API');
                }
                
                console.log(`Generated task name from OpenAI: ${taskName}`);
                return taskName;
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.warn('Fetch request timed out, retrying...');
                } else {
                    console.error('API call error:', error);
                }
                
                retryCount++;
                if (retryCount < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; // Exponential backoff
                } else {
                    throw error; // Re-throw after max retries
                }
            }
        }
        
        throw new Error('Max retries exceeded');
    } catch (error) {
        console.error('Error generating task name with OpenAI:', error);
        // Fallback to incremental task naming only if OpenAI fails
        const taskNumber = globalTaskCounter++;
        return `Task ${taskNumber}: ${goalTypes[typeIndex][1]} for ${goalName}`;
    }
  }

  // Function to create hierarchical structure
  function createHierarchicalGoals(parentId, level, typeIndex, currentId, remainingRows, rowsPerGoal, config) {
    const goals = [];
    
    // If we've reached our target rows or maximum depth, stop
    if (remainingRows <= 0 || level >= config.hierarchyDepth) {
        return { goals, nextId: currentId, remainingRows };
    }

    // Get the goal level name for the current level
    const goalLevelName = GOAL_LEVELS[level];
    
    // Calculate how many child goals to create at this level - IMPROVED CALCULATION
    // Determine how many goals we need at this level to reach our target
    // If we're at the lowest level, create more goals to fill the rows
    let numChildGoals = config.childGoalsPerParent;
    
    // If we're at the root level or not generating enough rows, increase the number of goals
    if (level === 0 || remainingRows > (config.targetRows * 0.5)) {
        // Calculate estimated rows per branch
        const levelsRemaining = config.hierarchyDepth - level;
        const estimatedRowsPerBranch = (levelsRemaining > 1) ? 
            Math.pow(config.childGoalsPerParent, levelsRemaining - 1) * (1 + config.tasksPerGoal) : 
            (1 + config.tasksPerGoal);
        
        // Calculate how many branches we need
        const requiredBranches = Math.ceil(remainingRows / estimatedRowsPerBranch);
        numChildGoals = Math.max(numChildGoals, requiredBranches);
        
        // For root level, always create at least 10 goals if we have many rows to generate
        if (level === 0 && remainingRows > 100) {
            numChildGoals = Math.max(numChildGoals, 10);
        }
        
        console.log(`Level ${level}: Need ${requiredBranches} branches, creating ${numChildGoals} goals`);
    }
    
    // Hard limit to avoid infinite loops or excessive goal creation
    const MAX_GOALS_PER_LEVEL = 100;
    numChildGoals = Math.min(numChildGoals, MAX_GOALS_PER_LEVEL);
    
    if (numChildGoals <= 0) {
        return { goals, nextId: currentId, remainingRows };
    }

    console.log(`Creating ${numChildGoals} goals at level ${level} (${goalLevelName}), remaining rows: ${remainingRows}`);

    // Create child goals
    for (let i = 0; i < numChildGoals && remainingRows > 0; i++) {
        const goalId = currentId++;
        
        // Get a suitable owner for this goal level
        const owner = getOwnerForLevel(goalLevelName);
        
        // Only create the goal if the owner has permission for this goal level
        if (owner && owner.assignableLevels.includes(goalLevelName)) {
            const newGoal = {
                id: goalId,
                parentId,
                level: goalLevelName,
                typeIndex: (typeIndex + i) % goalTypes.length,
                index: i,
                startValue: 0,
                targetValue: 100,
                owner: owner
            };
            
            // Account for this goal row
            goals.push(newGoal);
            remainingRows -= 1;

            // Recursively create child goals if we haven't reached maximum depth
            if (level < config.hierarchyDepth - 1 && remainingRows > 0) {
                const { goals: childGoals, nextId: nextChildId, remainingRows: updatedRemainingRows } = createHierarchicalGoals(
                    goalId,
                    level + 1,
                    (typeIndex + i) % goalTypes.length,
                    currentId,
                    remainingRows,
                    rowsPerGoal,
                    config
                );
                goals.push(...childGoals);
                currentId = nextChildId;
                remainingRows = updatedRemainingRows;
            }
            
            // Add tasks to this goal
            const taskCount = Math.min(config.tasksPerGoal, remainingRows);
            remainingRows -= taskCount;
        }
    }

    return { goals, nextId: currentId, remainingRows };
  }

  // Generate CSV data
  async function generateCSV(config, apiKey, updateProgressFn) {
    const startDate = dateUtils.getFormattedDate();
    const dueDate = dateUtils.getFutureDueDate();
    
    // CSV header
    let csvContent = 'ID,Name,Goal Level,Goal Owner,Goal Creator,Metric Type,Description,Start Value,Target Value,Current Value,Goal Cycle,Due Date,Parent,Type,start date\n';
    
    // Calculate how many rows each goal will need (including its tasks)
    const rowsPerGoal = 1 + config.tasksPerGoal;
    
    let currentId = 1001;
    let remainingRows = config.targetRows;

    // Update progress - 10% complete after initialization
    updateProgressFn(10);
    console.log(`Starting CSV generation, target rows: ${remainingRows}, rowsPerGoal: ${rowsPerGoal}, useOpenAI: ${config.useOpenAI}`);

    // Create hierarchical goal structure
    const goalStructures = [];
    
    // Calculate how many root goals we need to achieve target rows
    // This calculation is based on the hierarchical structure
    const goalMultiplier = Math.pow(config.childGoalsPerParent, config.hierarchyDepth - 1);
    const estimatedRowsPerRootGoal = goalMultiplier * rowsPerGoal;
    const initialRootGoals = Math.max(5, Math.ceil(config.targetRows / estimatedRowsPerRootGoal));
    
    console.log(`Estimated rows per root goal: ${estimatedRowsPerRootGoal}, planning to create ${initialRootGoals} root goals`);
    
    // Create multiple root goals to reach the target
    let attempts = 0;
    const maxAttempts = 20; // Increase max attempts
    const maxRootGoals = Math.max(100, initialRootGoals * 2); // Allow for more root goals if needed
    
    for (let rootGoalNum = 0; rootGoalNum < maxRootGoals && remainingRows > 0 && attempts < maxAttempts; rootGoalNum++) {
        const { goals, nextId, remainingRows: updatedRemainingRows } = createHierarchicalGoals(
            null, // No parent for root goals
            0,    // Start at organization level
            goalStructures.length % goalTypes.length,
            currentId,
            remainingRows,
            rowsPerGoal,
            config
        );

        if (goals.length === 0) {
            attempts++;
            if (attempts >= maxAttempts) break;
            continue;
        }

        goalStructures.push(...goals);
        currentId = nextId;
        remainingRows = updatedRemainingRows;
        console.log(`Root goal ${rootGoalNum + 1} created, remaining rows: ${remainingRows}, goals so far: ${goalStructures.length}`);
        
        // If we're very close to the target, we can stop
        if (remainingRows <= 10) {
            break;
        }
    }

    // Fallback: If we still don't have enough goals, create individual goals directly
    if (remainingRows > 10 && goalStructures.length < config.targetRows / rowsPerGoal) {
        console.log(`Still need ${remainingRows} more rows, adding individual goals directly`);
        
        // Calculate how many individual goals to create to meet the remaining rows
        const directGoalsNeeded = Math.ceil(remainingRows / (1 + config.tasksPerGoal));
        console.log(`Creating ${directGoalsNeeded} direct goals to fulfill the remaining rows target`);
        
        // For direct creation, use different departments to add variety
        const departments = ['Engineering', 'Sales', 'Marketing', 'Finance', 'Product', 'Design'];
        
        for (let i = 0; i < directGoalsNeeded && remainingRows > 0; i++) {
            // Create direct goals of all types, not just Individual, to ensure variety
            const goalLevel = GOAL_LEVELS[i % GOAL_LEVELS.length];
            const owner = getOwnerForLevel(goalLevel);
            
            if (owner && owner.assignableLevels.includes(goalLevel)) {
                const goal = {
                    id: currentId++,
                    parentId: null,
                    level: goalLevel,
                    typeIndex: i % goalTypes.length,
                    index: i,
                    startValue: 0,
                    targetValue: 100,
                    owner: owner,
                    department: departments[i % departments.length]
                };
                
                goalStructures.push(goal);
                remainingRows -= 1; // Account for goal row
                
                // Add tasks for this goal - make sure we track them properly
                const tasksToCreate = Math.min(config.tasksPerGoal, remainingRows);
                
                if (tasksToCreate > 0) {
                    // Reserve these task slots in the remaining rows count
                    remainingRows -= tasksToCreate;
                    console.log(`Added goal ${goal.id} with ${tasksToCreate} tasks, remaining rows: ${remainingRows}`);
                } else {
                    console.log(`Added goal ${goal.id} with no tasks, remaining rows: ${remainingRows}`);
                }
            }
        }
        
        console.log(`Added ${directGoalsNeeded} goals directly, remaining rows: ${remainingRows}`);
    }

    // Update progress - 20% complete after structure creation
    updateProgressFn(20);
    console.log(`Goal structure created with ${goalStructures.length} goals. Remaining rows: ${remainingRows}`);

    // Process goals sequentially when not using OpenAI to avoid API rate limits
    const processedGoals = [];
    const totalGoals = goalStructures.length;
    
    // Use different processing approaches based on whether we're using OpenAI
    if (!config.useOpenAI) {
        // Fast path: process without API calls
        console.log("Using fast path (no OpenAI) for goal processing");
        for (let i = 0; i < goalStructures.length; i++) {
            const goal = goalStructures[i];
            
            // Get creator for the goal using the new function
            const creator = getRandomCreatorForLevel(goal.level);
            
            // Generate simple goal name without API
            const goalNumber = globalGoalCounter++;
            const goalName = `Goal ${goalNumber}: ${goalTypes[goal.typeIndex][0]} ${Math.floor(goal.index/5) + 1}`;
            
            // Generate simple tasks without API
            const tasks = [];
            for (let j = 0; j < config.tasksPerGoal; j++) {
                const taskNumber = globalTaskCounter++;
                tasks.push({
                    id: currentId++,
                    name: `Task ${taskNumber}: ${goalTypes[goal.typeIndex][1]} for ${goalName}`,
                    startValue: 0,
                    targetValue: 100,
                    currentValue: generateProgress(1, 100)
                });
            }
            
            // Update progress incrementally
            const progressPercent = 20 + (i / totalGoals * 70);
            updateProgressFn(Math.floor(progressPercent));
            
            processedGoals.push({
                ...goal,
                name: goalName,
                owner: goal.owner,
                creator,
                currentValue: generateProgress(1, 100),
                tasks
            });
        }
    } else {
        // OpenAI path with improved batching and error handling
        console.log("Using OpenAI for goal naming with improved batching");
        const batchSize = 5; // Process 5 goals at a time
        
        for (let i = 0; i < goalStructures.length; i += batchSize) {
            const batch = goalStructures.slice(i, i + batchSize);
            const batchPromises = batch.map(goal => 
                (async () => {
                    // First select a creator for this goal based on the goal level
                    const creator = getRandomCreatorForLevel(goal.level);
                    
                    // Generate goal name with improved timeout and error handling
                    let goalName;
                    try {
                        // Always use OpenAI when an API key is provided
                        goalName = await generateGoalName(apiKey, goal.typeIndex, goal.index, goal.level);
                    } catch (error) {
                        console.warn('Goal name generation failed, using fallback:', error);
                        const goalNumber = globalGoalCounter++;
                        goalName = `Goal ${goalNumber}: ${goalTypes[goal.typeIndex][0]} ${Math.floor(goal.index/5) + 1}`;
                    }
                    
                    // Generate tasks with improved error handling
                    const tasks = [];
                    for (let j = 0; j < config.tasksPerGoal; j++) {
                        let taskName;
                        try {
                            // Always use OpenAI when an API key is provided
                            taskName = await generateTaskName(apiKey, goal.typeIndex, goal.index, goalName, goal.level);
                        } catch (error) {
                            console.warn('Task name generation failed, using fallback:', error);
                            const taskNumber = globalTaskCounter++;
                            taskName = `Task ${taskNumber}: ${goalTypes[goal.typeIndex][1]} for ${goalName}`;
                        }
                        
                        tasks.push({
                            id: currentId++,
                            name: taskName,
                            startValue: 0,
                            targetValue: 100,
                            currentValue: generateProgress(1, 100)
                        });
                    }
                    
                    return {
                        ...goal,
                        name: goalName,
                        owner: goal.owner,
                        creator,
                        currentValue: generateProgress(1, 100),
                        tasks
                    };
                })()
            );
            
            // Process this batch with error handling
            try {
                const batchResults = await Promise.allSettled(batchPromises);
                
                // Filter out any rejected promises and use fallback
                batchResults.forEach((result, idx) => {
                    if (result.status === 'fulfilled') {
                        processedGoals.push(result.value);
                    } else {
                        // Create a fallback goal with simple naming
                        const goal = batch[idx];
                        const goalNumber = globalGoalCounter++;
                        const goalName = `Goal ${goalNumber}: ${goalTypes[goal.typeIndex][0]} ${Math.floor(goal.index/5) + 1}`;
                        
                        // Get a random creator for the goal level
                        const creator = getRandomCreatorForLevel(goal.level);
                        
                        // Create simple tasks
                        const tasks = [];
                        for (let j = 0; j < config.tasksPerGoal; j++) {
                            const taskNumber = globalTaskCounter++;
                            tasks.push({
                                id: currentId++,
                                name: `Task ${taskNumber}: ${goalTypes[goal.typeIndex][1]} for ${goalName}`,
                                startValue: 0,
                                targetValue: 100,
                                currentValue: generateProgress(1, 100)
                            });
                        }
                        
                        processedGoals.push({
                            ...goal,
                            name: goalName,
                            owner: goal.owner,
                            creator,
                            currentValue: generateProgress(1, 100),
                            tasks
                        });
                    }
                });
            } catch (error) {
                console.error('Batch processing error:', error);
                // Continue with next batch despite errors
            }
            
            // Update progress
            const progressPercent = 20 + ((i + batch.length) / totalGoals * 70);
            updateProgressFn(Math.floor(progressPercent));
            
            // Add a small delay between batches to avoid rate limits
            if (i + batchSize < goalStructures.length) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Slightly longer delay
            }
        }
    }

    // Update progress - 90% complete
    updateProgressFn(90);
    console.log(`Processed ${processedGoals.length} goals with names and tasks`);

    // Final check - if we're still short on rows, add more tasks to existing goals
    if (remainingRows > 0 && processedGoals.length > 0) {
        console.log(`Still ${remainingRows} rows short of target. Adding extra tasks to existing goals.`);
        
        // Distribute remaining tasks among existing goals
        let goalIndex = 0;
        const extraTaskPromises = [];
        const goalIndexMap = {};

        // Prepare promises for all additional tasks
        for (let i = 0; i < remainingRows; i++) {
            const currentGoalIndex = goalIndex;
            const currentGoal = processedGoals[currentGoalIndex];
            
            // Track which goals are getting extra tasks for batch updates
            if (!goalIndexMap[currentGoalIndex]) {
                goalIndexMap[currentGoalIndex] = [];
            }
            
            if (config.useOpenAI && apiKey) {
                // Generate task name with OpenAI
                extraTaskPromises.push(
                    (async () => {
                        try {
                            const taskName = await generateTaskName(
                                apiKey, 
                                currentGoal.typeIndex, 
                                currentGoal.index, 
                                currentGoal.name, 
                                currentGoal.level
                            );
                            
                            const extraTask = {
                                id: currentId++,
                                name: taskName,
                                startValue: 0,
                                targetValue: 100,
                                currentValue: generateProgress(1, 100),
                                goalIndex: currentGoalIndex
                            };
                            
                            return extraTask;
                        } catch (error) {
                            console.warn('Extra task name generation failed:', error);
                            const taskNumber = globalTaskCounter++;
                            
                            const extraTask = {
                                id: currentId++,
                                name: `Additional Task ${taskNumber}: Supporting ${currentGoal.name}`,
                                startValue: 0,
                                targetValue: 100,
                                currentValue: generateProgress(1, 100),
                                goalIndex: currentGoalIndex
                            };
                            
                            return extraTask;
                        }
                    })()
                );
            } else {
                // Use simple naming for tasks
                const taskNumber = globalTaskCounter++;
                const extraTask = {
                    id: currentId++,
                    name: `Additional Task ${taskNumber}: Supporting ${currentGoal.name}`,
                    startValue: 0,
                    targetValue: 100,
                    currentValue: generateProgress(1, 100),
                    goalIndex: currentGoalIndex
                };
                
                extraTaskPromises.push(Promise.resolve(extraTask));
            }
            
            // Move to next goal
            goalIndex = (goalIndex + 1) % processedGoals.length;
        }
        
        // Process all the extra task promises
        if (config.useOpenAI && apiKey) {
            console.log("Generating extra tasks with OpenAI...");
            
            // Wait for all task promises to resolve
            const extraTasks = await Promise.allSettled(extraTaskPromises);
            
            // Add each task to its respective goal
            extraTasks.forEach(result => {
                if (result.status === 'fulfilled') {
                    const task = result.value;
                    processedGoals[task.goalIndex].tasks.push({
                        id: task.id,
                        name: task.name,
                        startValue: task.startValue,
                        targetValue: task.targetValue,
                        currentValue: task.currentValue
                    });
                }
            });
        } else {
            // Process synchronously for simple naming
            extraTaskPromises.forEach(async (promise) => {
                const task = await promise;
                processedGoals[task.goalIndex].tasks.push({
                    id: task.id,
                    name: task.name,
                    startValue: task.startValue,
                    targetValue: task.targetValue,
                    currentValue: task.currentValue
                });
            });
        }
        
        console.log(`Added ${remainingRows} extra tasks to reach target row count.`);
    }
    
    // Build CSV content from processed goals
    for (const goal of processedGoals) {
        // Add goal row
        const goalCycle = Math.random() < 0.5 ? 'Y 2025' : 'Q2 2025';
        const goalRow = `${goal.id},${goal.name},${goal.level},${goal.owner.email},${goal.creator},Numeric,Enhance system functionality,${goal.startValue},${goal.targetValue},${goal.currentValue},${goalCycle},${dueDate},${goal.parentId || ''},Goal,${startDate}\n`;
        csvContent += goalRow;
        
        // Add task rows
        for (const task of goal.tasks) {
            const taskRow = `${task.id},${task.name},,${goal.owner.email},${goal.creator},Binary,Implement functionality,${task.startValue},${task.targetValue},${task.currentValue},Q4 2024,${dueDate},${goal.id},Task,${startDate}\n`;
            csvContent += taskRow;
        }
    }

    // Update progress - 100% complete
    updateProgressFn(100);
    console.log(`CSV generation complete with ${processedGoals.length} goals and ${csvContent.split('\n').length - 2} total rows`);
    
    return csvContent;
  }

  // Parse the manager reportees CSV to get manager-reportee relationships
  function parseManagerReportees() {
    const lines = managerReporteesCSV.split('\n').slice(1); // Skip header
    const managers = new Map();
    const reportees = new Set();
    
    lines.forEach(line => {
      const parts = line.split(',');
      const managerEmail = parts[0];
      const reporteeEmail = parts[3];
      
      if (!managers.has(managerEmail)) {
        managers.set(managerEmail, new Set());
      }
      
      managers.get(managerEmail).add(reporteeEmail);
      reportees.add(reporteeEmail);
    });
    
    return { managers, reportees };
  }

  // Parse the department head members CSV
  function parseDeptHeadMembers() {
    const lines = deptHeadMembersCSV.split('\n').slice(1); // Skip header
    const deptHeads = new Map();
    const deptMembers = new Map();
    
    lines.forEach(line => {
      const parts = line.split(',');
      const deptHeadEmail = parts[1];
      const department = parts[2];
      const memberEmail = parts[4];
      
      if (!deptHeads.has(deptHeadEmail)) {
        deptHeads.set(deptHeadEmail, department);
      }
      
      if (!deptMembers.has(deptHeadEmail)) {
        deptMembers.set(deptHeadEmail, new Set());
      }
      
      deptMembers.get(deptHeadEmail).add(memberEmail);
    });
    
    return { deptHeads, deptMembers };
  }

  // Parse the people directory and role-related CSVs to identify user roles
  function parseUserRoles() {
    // Define the organization head email
    const orgHeadEmail = 'eswar.a+111@surveysparrow.com';
    
    // Get manager-reportee relationships
    const { managers, reportees } = parseManagerReportees();
    
    // Get department head info
    const { deptHeads, deptMembers } = parseDeptHeadMembers();
    
    // Parse the people directory for additional info
    const lines = peopleDirectoryCSV.split('\n').slice(1); // Skip header
    
    const users = {
      orgHead: orgHeadEmail,
      deptHeads: new Set(deptHeads.keys()),
      managers: new Set(managers.keys()),
      deptAndManager: new Set(),
      individuals: new Set(),
      all: new Set(),
      emailToName: new Map(),
      emailToDept: new Map()
    };
    
    // Identify users who are both department heads and managers
    deptHeads.forEach((dept, email) => {
      if (managers.has(email)) {
        users.deptAndManager.add(email);
      }
    });
    
    // Process people directory for additional details
    lines.forEach(line => {
      const parts = line.split(',');
      const email = parts[2];
      const name = parts[1];
      const dept = parts[4];
      
      users.all.add(email);
      users.emailToName.set(email, name);
      
      if (dept) {
        users.emailToDept.set(email, dept);
      }
      
      // If not a manager, dept head, or org head, classify as individual
      if (!managers.has(email) && !users.deptHeads.has(email) && email !== orgHeadEmail) {
        users.individuals.add(email);
      }
    });
    
    return { ...users, managers, reportees, deptMembers };
  }
  
  // Get user roles and access information
  const userRoles = parseUserRoles();

  // Get allowed goal levels by user role based on the corrected permission matrix
  function getAllowedGoalLevels(email) {
    // Organization Head can create all goal types
    if (email === userRoles.orgHead) {
      return ['Organization', 'Department', 'Team', 'Individual'];
    }
    
    // Both Department Head and Manager can create department, team and individual goals
    if (userRoles.deptAndManager.has(email)) {
      return ['Department', 'Team', 'Individual'];
    }
    
    // Department Lead can create department and individual goals (not team)
    if (userRoles.deptHeads.has(email)) {
      return ['Department', 'Individual'];
    }
    
    // Manager can create team and individual goals
    if (userRoles.managers.has(email)) {
      return ['Team', 'Individual'];
    }
    
    // Individual can only create individual goals
    return ['Individual'];
  }

  // Get users that a specific user can assign goals to
  function getAssignableUsers(email) {
    const assignable = new Set();
    
    // Organization Head can assign to everyone
    if (email === userRoles.orgHead) {
      return Array.from(userRoles.all);
    }
    
    // Department Head can assign to their department members
    if (userRoles.deptHeads.has(email) && userRoles.deptMembers.has(email)) {
      userRoles.deptMembers.get(email).forEach(memberEmail => {
        assignable.add(memberEmail);
      });
    }
    
    // Managers can assign to their reportees
    if (userRoles.managers.has(email) && userRoles.managers.has(email)) {
      userRoles.managers.get(email).forEach(reporteeEmail => {
        assignable.add(reporteeEmail);
      });
    }
    
    // Everyone can assign to themselves
    assignable.add(email);
    
    return Array.from(assignable);
  }
  
  // Prepare email data structure with roles and permissions for goal creation
  function prepareEmailsWithRoles() {
    const emails = {
      creator: userRoles.orgHead,
      owners: []
    };
    
    // Add all users with their roles and permissions
    userRoles.all.forEach(email => {
      let role;
      
      if (email === userRoles.orgHead) {
        role = 'Organization Head';
      } else if (userRoles.deptAndManager.has(email)) {
        role = 'Department Head & Manager';
      } else if (userRoles.deptHeads.has(email)) {
        role = 'Department Head';
      } else if (userRoles.managers.has(email)) {
        role = 'Manager';
      } else {
        role = 'Individual';
      }
      
      // Get assignable users for this email
      const assignableUsers = getAssignableUsers(email);
      
      emails.owners.push({
        email,
        role,
        assignableLevels: getAllowedGoalLevels(email),
        assignableUsers
      });
    });
    
    return emails;
  }
  
  // Prepare email data for role-based goal creation
  const userEmails = prepareEmailsWithRoles();
}); 