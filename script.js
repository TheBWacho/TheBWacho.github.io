/**
 * Exiled Lands Server Portal - Main Script
 */

// Google Apps Script Web App URL for the Mod List and Server Status Proxy
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbwidxTTzJihIeO12Au6E5DDlsTAiGWlMRN5o0JSmN-mi6y7YZQ7a-z8S4mbrD2GOjFBKw/exec";

/**
 * Handles tab switching by toggling visibility and active classes.
 */
function openTab(event, tabName) {
    event.preventDefault();
    const tabs = document.querySelectorAll('nav a');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const contentSections = document.querySelectorAll('.tab-content');
    contentSections.forEach(section => section.style.display = "none");

    const activeSection = document.getElementById(tabName);
    if (activeSection) {
        activeSection.style.display = "block";
    }
}

/**
 * Copies the Server IP to the clipboard for players.
 */
function copyIP() {
    // Game Port / Direct Connect Port
    const ipAddress = "98.165.20.97:7009"; 
    navigator.clipboard.writeText(ipAddress).then(() => {
        alert("Copied 98.165.20.97:7009 to clipboard! \nPaste it into the Direct Connect Box in Game");
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

        if (mods.length === 0) {
            modContainer.innerHTML = "<p>No mods found in the archives.</p>";
            return;
        }

        let html = '<ul class="race-list">'; 
        mods.forEach(mod => {
            if (mod.url !== "") {
                html += `<li><a href="${mod.url}" target="_blank" style="color: #a69a85; text-decoration: none; border-bottom: 1px dotted #b33030; transition: color 0.2s;"><strong>${mod.name}</strong></a></li>`;
            } else {
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

/**
 * Checks if the game server is online via Google Apps Script Proxy (Bypasses CORS)
 */
async function checkServerStatus() {
  // Point to Google Web App, adding "?action=status" so Google fetches from Steam using port 25575
  const url = SHEET_API_URL + "?action=status";
  const statusText = document.getElementById('status-text');
  
  // Set to 'Checking...' while it loads
  statusText.innerText = "Checking...";
  statusText.style.color = "#a69a85"; 

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // --> THIS WILL PRINT STEAM'S EXACT ANSWER IN YOUR BROWSER CONSOLE (F12) <--
    console.log("Steam API Response:", data); 
    
    // Check if Google successfully returned the Steam data
    if (data.response && data.response.success && data.response.servers && data.response.servers.length > 0) {
      statusText.innerText = "Online";
      statusText.style.color = "#4CAF50"; // Conan green
    } else {
      statusText.innerText = "Offline";
      statusText.style.color = "#b33030"; // Conan red
    }
  } catch (error) {
    console.error('Failed to reach server status:', error);
    statusText.innerText = "Unknown";
    statusText.style.color = "#a69a85"; 
  }
}

// Automatically load the mods AND check server status when the page finishes loading
window.addEventListener('DOMContentLoaded', () => {
    loadMods();
    checkServerStatus();
});