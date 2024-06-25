const menuItems = [
    'Merlot', 'Shiraz', 'Chardonnay', 'Cabernet', 'Saturn', 'Venus', 'Jupiter', 
    'France', 'England', 'Spain', 'Germany', 'Pecan', 'Walnut', 'Almond', 'Pistachio'
];

let startTime;
let results = [];
let currentTarget;

document.addEventListener('DOMContentLoaded', () => {
    const dropdownContent = document.getElementById('dropdownContent');
    const taskDescription = document.getElementById('taskDescription');

    function initializeMenu() {
        dropdownContent.innerHTML = '';
        let highlightedItems = getRandomItems(menuItems, 4);
        
        if (!highlightedItems.includes(currentTarget)) {
            highlightedItems[Math.floor(Math.random() * highlightedItems.length)] = currentTarget;
        }
        
        currentTarget = highlightedItems[Math.floor(Math.random() * highlightedItems.length)];
        taskDescription.innerHTML = `Task: Hover over the menu and select the highlighted word: <strong>${currentTarget}</strong>`;

        menuItems.forEach(item => {
            const menuItem = document.createElement('a');
            menuItem.href = '#';
            menuItem.innerText = item;
            menuItem.classList.add('menu-item');
            if (highlightedItems.includes(item)) {
                menuItem.classList.add('highlighted');
            }
            menuItem.addEventListener('click', (event) => handleMenuItemClick(event, item));
            dropdownContent.appendChild(menuItem);
        });

        setTimeout(() => {
            dropdownContent.querySelectorAll('.menu-item:not(.highlighted)').forEach(item => {
                item.style.opacity = '1';
            });
        }, 10);
    }

    function getRandomItems(arr, count) {
        const shuffled = arr.slice(0);
        let i = arr.length;
        let temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, count);
    }

    function handleMenuItemClick(event, item) {
        event.preventDefault();
        const endTime = new Date().getTime();
        const timeTaken = endTime - startTime;
        if (item === currentTarget) {
            results.push({ target: currentTarget, timeTaken });
            alert(`Correct! Time taken: ${timeTaken} ms`);
            initializeMenu();
        } else {
            alert('Incorrect item. Please try again.');
        }
    }

    document.querySelector('.dropbtn').addEventListener('mouseover', () => {
        startTime = new Date().getTime();
    });

    initializeMenu();
});


