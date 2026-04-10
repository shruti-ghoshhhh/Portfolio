document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       Smooth Fade Role Transition
       ========================================= */
    const typeWriterElement = document.getElementById('typewriter');
    
    // Array of roles to cycle through!
    const roles = [
        "Aspiring Software Developer.", 
        "Full Stack Developer.", 
        "Creative Problem Solver."
    ];
    
    let roleIndex = 0;
    
    function changeRole() {
        if (!typeWriterElement) return;

        // Start by fading out
        typeWriterElement.classList.remove('role-fade-in');
        typeWriterElement.classList.add('role-fade-out');
        
        // Wait for fade out animation to complete (0.5s)
        setTimeout(() => {
            // Update text to next role
            roleIndex = (roleIndex + 1) % roles.length;
            typeWriterElement.textContent = roles[roleIndex];
            
            // Fade in the new role
            typeWriterElement.classList.remove('role-fade-out');
            typeWriterElement.classList.add('role-fade-in');
        }, 500);
    }
    
    // Start the effect
    if(typeWriterElement) {
        // Set initial role
        typeWriterElement.textContent = roles[roleIndex];
        // Ensure it's faded in initially
        typeWriterElement.classList.add('role-fade-in');
        
        // Change role every 3 seconds (500ms fade out + 500ms fade in + 2000ms read time)
        setInterval(changeRole, 3000);
    }

    /* =========================================
       Scroll Reveal Animations
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach((section) => {
        observer.observe(section);
    });

    /* =========================================
       Horizontal Slider Logic
       ========================================= */
    const sliderWrappers = document.querySelectorAll('.slider-wrapper');
    
    sliderWrappers.forEach(wrapper => {
        const leftBtn = wrapper.querySelector('.left-btn');
        const rightBtn = wrapper.querySelector('.right-btn');
        const grid = wrapper.querySelector('.achievements-grid');

        if (leftBtn && rightBtn && grid) {
            const scrollAmount = 300; 

            rightBtn.addEventListener('click', () => {
                grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            leftBtn.addEventListener('click', () => {
                grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
    });

    /* =========================================
       LeetCode Dynamic Stats Integration
       ========================================= */
    async function fetchLeetCodeStats() {
        // REPLACE THIS WITH YOUR EXACT LEETCODE USERNAME
        const leetcodeUsername = 'shrutighoshh'; 
        
        const lcTitle = document.getElementById('leetcode-title');
        const imgBox = document.getElementById('leetcode-img-box');
        
        try {
            // 1. Fetch Total Solved
            if (lcTitle) {
                const statsResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`);
                const statsData = await statsResponse.json();
                
                if (statsData.status === 'success' && statsData.totalSolved > 0) {
                    lcTitle.textContent = `${statsData.totalSolved}+ LeetCode`;
                }
            }

            // 2. Profile Avatar & Stats Graph
            // This is now automatically handled natively in the HTML via leetcard.jacoblin.cool SVG!

        } catch (error) {
            console.error('Error fetching LeetCode data:', error);
            // It safely fails silently
        }
    }

    // Trigger the fetch automatically when the page loads
    fetchLeetCodeStats();

    /* =========================================
       Interactive Terminal Engine
       ========================================= */
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    const terminalBody = document.getElementById('terminal-body');

    if (terminalInput && terminalHistory && terminalBody) {
        
        const commandData = {
            'help': 'Available commands:<br>- <span style="color:var(--accent-color)">whoami</span>: View my identity<br>- <span style="color:var(--accent-color)">skills</span>: View my tech stack<br>- <span style="color:var(--accent-color)">training</span>: View my core training<br>- <span style="color:var(--accent-color)">certificate</span>: View my certifications<br>- <span style="color:var(--accent-color)">achievements</span>: View my notable achievements<br>- <span style="color:var(--accent-color)">leetcode</span>: Get my LeetCode profile link<br>- <span style="color:var(--accent-color)">linkedin</span>: Get my LinkedIn profile link<br>- <span style="color:var(--accent-color)">github</span>: Get my GitHub profile link<br>- <span style="color:var(--accent-color)">clear</span>: Clear terminal history',
            'whoami': 'Shruti Ghosh<br>Creative Problem Solver & Software Developer<br>Aiming to build tech solutions aligned with SDGs and create real-world impact.',
            'skills': 'Java, Data Structures, Algorithms, React.js, MERN Stack, MongoDB, Leaflet.js, API Integration',
            'training': 'Completed Data Structures and Algorithms training from CipherSchools.<br>Applying the concepts by solving hundreds of problems on LeetCode and GeeksforGeeks.',
            'certificate': '1. DSA in Java (CipherSchools)<br>2. Java Excellence (NeoColab)<br>3. Responsive Web Design (freeCodeCamp)',
            'achievements': '300+ LeetCode problems solved focusing on optimization.<br>🥇 Thought Mingle Forum (Winner)<br>🥈 Tech Talkdown (First Runner Up)<br>🥉 Intellect Exchange & Minds in Motion',
            'leetcode': '<a href="https://leetcode.com/u/shrutighoshh/" target="_blank" style="color:var(--accent-color); text-decoration:underline;">View my LeetCode Profile ↗</a>',
            'linkedin': '<a href="https://linkedin.com/in/shruti-ghosh958/" target="_blank" style="color:var(--accent-color); text-decoration:underline;">View my LinkedIn Profile ↗</a>',
            'github': '<a href="https://github.com/shruti-ghoshhhh" target="_blank" style="color:var(--accent-color); text-decoration:underline;">View my GitHub Profile ↗</a>',
        };

        // Welcome Message Initializer
        terminalHistory.innerHTML = `
            <p style="color:var(--text-secondary); margin-bottom: 20px;">
                Welcome to Shruti's interactive shell.<br>
                Type <span style="color:var(--accent-color)">'help'</span> to see a list of available commands.
            </p>
        `;

        // Handle Enter Keypress
        terminalInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                
                // Echo the command
                const logLine = document.createElement('p');
                logLine.innerHTML = `<span class="prompt">shruti@portfolio:~$</span> ${this.value}`;
                terminalHistory.appendChild(logLine);
                
                // Route Command
                if (command === 'clear') {
                    terminalHistory.innerHTML = '';
                } else if (command === '') {
                    // Do nothing on empty enter
                } else if (commandData[command]) {
                    const outputLine = document.createElement('p');
                    outputLine.className = 'output';
                    outputLine.innerHTML = commandData[command];
                    terminalHistory.appendChild(outputLine);
                } else {
                    const errorLine = document.createElement('p');
                    errorLine.className = 'output';
                    errorLine.innerHTML = `Command '\${command}' not found. Type 'help'.`;
                    terminalHistory.appendChild(errorLine);
                }

                // Reset and Scroll
                this.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

});
