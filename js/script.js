// =====================================================
// DOM Elements
// =====================================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const tabs = document.querySelectorAll('.tab');
const tabContents = {
    book: document.getElementById('bookBox'),
    pnr: document.getElementById('pnrBox'),
    chart: document.getElementById('chartBox'),
    cancel: document.getElementById('cancelBox')
};
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const swapStationsBtn = document.getElementById('swapStationsBtn');
const searchTrainsBtn = document.getElementById('searchTrainsBtn');
const checkPnrBtn = document.getElementById('checkPnrBtn');
const trainsTabs = document.querySelectorAll('.trains-tab');
const trainsGrid = document.getElementById('trainsGrid');

// =====================================================
// Mobile Menu Toggle
// =====================================================
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// =====================================================
// Booking Form Tabs
// =====================================================
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all tab contents
        Object.values(tabContents).forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected tab content
        const tabId = tab.getAttribute('data-tab');
        if (tabContents[tabId]) {
            tabContents[tabId].style.display = 'block';
        }
    });
});

// =====================================================
// Swap Stations Functionality
// =====================================================
swapStationsBtn.addEventListener('click', () => {
    const fromStation = document.getElementById('fromStation');
    const toStation = document.getElementById('toStation');
    const temp = fromStation.value;
    fromStation.value = toStation.value;
    toStation.value = temp;
});

// =====================================================
// Set Default Dates
// =====================================================
function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format date as YYYY-MM-DD
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    // Set journey date to tomorrow
    const journeyDateInput = document.getElementById('journeyDate');
    if (journeyDateInput) {
        journeyDateInput.value = formatDate(tomorrow);
        journeyDateInput.min = formatDate(today);
    }
    
    // Set chart date to today
    const chartDateInput = document.getElementById('chartDate');
    if (chartDateInput) {
        chartDateInput.value = formatDate(today);
        chartDateInput.min = formatDate(today);
    }
    
    // Set live train date to today
    const liveTrainDateInput = document.getElementById('liveTrainDate');
    if (liveTrainDateInput) {
        liveTrainDateInput.value = formatDate(today);
        liveTrainDateInput.min = formatDate(today);
    }
    
    // Set PNR date
    const pnrDateSpan = document.getElementById('pnrDate');
    if (pnrDateSpan) {
        pnrDateSpan.textContent = formatDate(tomorrow);
    }
}

// =====================================================
// Search Trains Button
// =====================================================
searchTrainsBtn.addEventListener('click', () => {
    const fromStation = document.getElementById('fromStation').value;
    const toStation = document.getElementById('toStation').value;
    const journeyDate = document.getElementById('journeyDate').value;
    
    if (!fromStation || !toStation) {
        alert('Please enter both source and destination stations.');
        return;
    }
    
    alert(`Searching trains from ${fromStation} to ${toStation} on ${journeyDate}`);
    // In a real application, this would redirect to search results page
});

// =====================================================
// Check PNR Status
// =====================================================
checkPnrBtn.addEventListener('click', () => {
    const pnrNumber = document.getElementById('pnrNumber').value;
    const pnrResult = document.getElementById('pnrResult');
    
    if (!pnrNumber || pnrNumber.length !== 10) {
        alert('Please enter a valid 10-digit PNR number.');
        return;
    }
    
    // Show loading state
    checkPnrBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
    checkPnrBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        pnrResult.style.display = 'block';
        checkPnrBtn.innerHTML = '<i class="fas fa-check-circle"></i> Check PNR Status';
        checkPnrBtn.disabled = false;
        
        // Scroll to result
        pnrResult.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
});

// =====================================================
// Modal Functions
// =====================================================
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'flex';
});

closeLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// =====================================================
// Train Data
// =====================================================
const trainData = {
    all: [
        {
            name: "VANDE BHARAT EXPRESS",
            number: "22435",
            from: "NEW DELHI (NDLS)",
            to: "MUMBAI CENTRAL (BCT)",
            departure: "08:00",
            arrival: "20:30",
            duration: "12h 30m",
            type: "vande"
        },
        {
            name: "RAJDHANI EXPRESS",
            number: "12951",
            from: "MUMBAI CENTRAL (BCT)",
            to: "NEW DELHI (NDLS)",
            departure: "16:35",
            arrival: "08:55",
            duration: "16h 20m",
            type: "rajdhani"
        },
        {
            name: "SHATABDI EXPRESS",
            number: "12009",
            from: "NEW DELHI (NDLS)",
            to: "KANPUR CENTRAL (CNB)",
            departure: "06:00",
            arrival: "11:05",
            duration: "5h 05m",
            type: "shatabdi"
        },
        {
            name: "DURONTO EXPRESS",
            number: "12213",
            from: "HOWRAH JN (HWH)",
            to: "NEW DELHI (NDLS)",
            departure: "22:05",
            arrival: "23:55",
            duration: "25h 50m",
            type: "duronto"
        },
        {
            name: "GATIMAAN EXPRESS",
            number: "12049",
            from: "H. NIZAMUDDIN (NZM)",
            to: "JHANSI (JHS)",
            departure: "08:10",
            arrival: "12:25",
            duration: "4h 15m",
            type: "shatabdi"
        },
        {
            name: "VANDE BHARAT EXPRESS",
            number: "20677",
            from: "CHENNAI CENTRAL (MAS)",
            to: "MYSURU JN (MYS)",
            departure: "05:50",
            arrival: "13:00",
            duration: "7h 10m",
            type: "vande"
        }
    ],
    vande: [],
    rajdhani: [],
    shatabdi: [],
    duronto: []
};

// Filter trains by type
trainData.vande = trainData.all.filter(train => train.type === 'vande');
trainData.rajdhani = trainData.all.filter(train => train.type === 'rajdhani');
trainData.shatabdi = trainData.all.filter(train => train.type === 'shatabdi');
trainData.duronto = trainData.all.filter(train => train.type === 'duronto');

// =====================================================
// Render Trains Grid
// =====================================================
function renderTrainsGrid(trainType = 'all') {
    const trains = trainType === 'all' ? trainData.all : trainData[trainType];
    
    trainsGrid.innerHTML = trains.map(train => `
        <div class="train-card" data-train-type="${train.type}">
            <div class="train-card-header">
                <div class="train-name">${train.name}</div>
                <div class="train-number">${train.number}</div>
            </div>
            <div class="train-card-body">
                <div class="train-route">
                    <div class="station">
                        <div class="station-name">${train.from.split(' (')[0]}</div>
                        <div class="station-time">${train.departure}</div>
                    </div>
                    <div class="train-duration">
                        <i class="fas fa-clock"></i> ${train.duration}
                    </div>
                    <div class="station">
                        <div class="station-name">${train.to.split(' (')[0]}</div>
                        <div class="station-time">${train.arrival}</div>
                    </div>
                </div>
                <div class="train-details">
                    <div class="train-detail-item">
                        <i class="fas fa-train"></i>
                        <span>${train.type.toUpperCase()}</span>
                    </div>
                    <div class="train-detail-item">
                        <i class="fas fa-chair"></i>
                        <span>AC Chair Car</span>
                    </div>
                    <button class="btn btn-primary btn-small">Book Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

// =====================================================
// Train Type Tabs
// =====================================================
trainsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        trainsTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Render trains for selected type
        const trainType = tab.getAttribute('data-train-type');
        renderTrainsGrid(trainType);
    });
});

// =====================================================
// Live Status Check
// =====================================================
const checkLiveStatusBtn = document.getElementById('checkLiveStatusBtn');
const liveStatusResult = document.getElementById('liveStatusResult');

if (checkLiveStatusBtn) {
    checkLiveStatusBtn.addEventListener('click', () => {
        const trainNumber = document.getElementById('liveTrainNumber').value;
        
        if (!trainNumber) {
            alert('Please enter a train number.');
            return;
        }
        
        // Show loading state
        checkLiveStatusBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
        checkLiveStatusBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            liveStatusResult.style.display = 'block';
            checkLiveStatusBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Check Live Status';
            checkLiveStatusBtn.disabled = false;
            
            // Scroll to result
            liveStatusResult.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
}

// =====================================================
// Service Items Click
// =====================================================
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', () => {
        const service = item.getAttribute('data-service');
        alert(`Opening ${service} service...`);
    });
});

// =====================================================
// Book Vande Bharat Button
// =====================================================
const bookVandeBharatBtn = document.getElementById('bookVandeBharatBtn');
if (bookVandeBharatBtn) {
    bookVandeBharatBtn.addEventListener('click', () => {
        // Switch to booking tab
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector('.tab[data-tab="book"]').classList.add('active');
        
        // Show booking form
        Object.values(tabContents).forEach(content => {
            content.style.display = 'none';
        });
        tabContents.book.style.display = 'block';
        
        // Scroll to booking form
        document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
        
        // Check Vande Bharat Only checkbox
        document.getElementById('trainType').checked = true;
    });
}

// =====================================================
// Ask DISHA Button
// =====================================================
const askDishaBtn = document.getElementById('askDishaBtn');
if (askDishaBtn) {
    askDishaBtn.addEventListener('click', () => {
        alert('DISHA: IRCTC\'s AI assistant is coming soon!');
    });
}

// =====================================================
// Initialize
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    // Set default dates
    setDefaultDates();
    
    // Render initial trains grid
    renderTrainsGrid('all');
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navMenu.classList.remove('active');
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav items on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    });
    
    // Animate Vande Bharat counter
    const vandeCount = document.getElementById('vandeCount');
    if (vandeCount) {
        let count = 0;
        const target = 50;
        const increment = target / 50;
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                vandeCount.textContent = Math.floor(count) + "+";
                setTimeout(updateCount, 30);
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(vandeCount);
            }
        });
        
        observer.observe(vandeCount);
    }
});