/**
 * Exiled Lands Server Portal - Main Script
 */

// Google Apps Script Web App URL for the Mod List
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbwidxTTzJihIeO12Au6E5DDlsTAiGWlMRN5o0JSmN-mi6y7YZQ7a-z8S4mbrD2GOjFBKw/exec";

/**
 * Handles tab switching by toggling visibility and active classes.
 */
function openTab(event, tabName) {
    // 1. Prevent page jump
    event.preventDefault();

    // 2. Clear 'active' status from all nav buttons
    const tabs = document.querySelectorAll('nav a');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // 3. Set current clicked tab to active
    event.currentTarget.classList.add('active');

    // 4. Hide all content sections
    const contentSections = document.querySelectorAll('.tab-content');
    contentSections.forEach(section => {
        section.style.display = "none";
    });

    // 5. Show the specifically requested tab
    const activeSection = document.getElementById(tabName);
    if (activeSection) {
        activeSection.style.display = "block";
    }

    console.log("Exploring the Exiled Lands: " + tabName);
}

/**
 * Copies the Server IP to the clipboard for players.
 */
function copyIP() {
    // Replace this string with your actual server IP
    const ipAddress = "123.456.78.90:7777"; 
    
    navigator.clipboard.writeText(ipAddress).then(() => {
        alert("Server IP copied to clipboard! Prepare for battle.");
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

/**
 * Fetches the dynamic mod list from the Google Sheet and builds the HTML.
 */
async function loadMods() {
    const modContainer = document.getElementById('mod-container');

    try {
        const response = await fetch(SHEET_API_URL);
        const mods = await response.json();

        // Check if data is empty
        if (mods.length === 0) {
            modContainer.innerHTML = "<p>No mods found in the archives.</p>";
            return;
        }

        // Build the HTML list using the existing Conan CSS classes
        let html = '<ul class="race-list">'; 
        
        mods.forEach(mod => {
            // If the mod has a hyperlink from the sheet, make it clickable
            if (mod.url !== "") {
                html += `<li>
                            <a href="${mod.url}" target="_blank" style="color: #a69a85; text-decoration: none; border-bottom: 1px dotted #b33030; transition: color 0.2s;">
                                <strong>${mod.name}</strong>
                            </a>
                         </li>`;
            } else {
                // If there's no link, just show the text
                html += `<li><strong>${mod.name}</strong></li>`;
            }
        });
        
        html += '</ul>';
        modContainer.innerHTML = html;

    } catch (error) {
        console.error("Error fetching mods:", error);
        modContainer.innerHTML = "<p style='color: #b33030;'>Failed to load the mod list. The sorcery was disrupted.</p>";
    }
}

// Automatically load the mods when the page finishes loading
window.addEventListener('DOMContentLoaded', loadMods);