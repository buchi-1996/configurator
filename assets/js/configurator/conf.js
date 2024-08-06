import { frames, houseFronts, catalogs, glasses, windowFrames, colors, decors, handles } from './api.js';
import { handleLoad } from './utils.js';

class App {
    constructor() {
        this.initializeVariables()
        this.init()
        this.loadEvents()

    }

    initializeVariables = () => {
        this.appCurrentMode = 'door';
        this.currentAppView = 'indoor'
        this.selectedFrameForm = frames[0].form
        this.currentDoorFrame = 0
        this.currentDoorTab = this.selectedFrameForm.indexOf(1); // Index of the currently active tab
        this.currentGlassTab = this.selectedFrameForm.indexOf(1); // Index of the currently active tab
        this.currentSelectedGlassIndices = [0, 0, 0];
        this.currentSelectedDoorIndices = [0, 0, 0];
        this.currentDoorModel = 0
        this.currentCatalog = 0
        this.currentHouseFront = 0
        this.settingsTitle = ''
        this.currentMenuItem = 0;
        this.currentColorTab = 0 //color = 0, decor = 1
        this.DoorColor = { inside: { door: '', frame: '' }, outside: { door: '', frame: '' } }

        this.sidebarSettingsModal = document.querySelector('.tools_sidebar')
        this.modalWrapper = document.querySelector('.conf_sidebar_wrapper')
        this.sidebarModalContents = document.querySelector('.tools_sidebar-content')
        this.closeSettingsModalBtn = document.querySelector('.settings-close-btn')
        this.houseFrontPreviewImg = document.querySelector('.blur')
        this.goFullScreenBtn = document.querySelector('.full-screen')
        this.getQuoteDesktop = document.querySelector('.summary');
        this.prevMenu = document.querySelector('.prev-btn');
        this.nextMenu = document.querySelector('.next-btn');
        this.desktopMenuItems = document.querySelector('.conf_sidebar_menu');
        this.modeSwitchButtonsDesktop = document.querySelectorAll('.conf_sidebar-header .product_select_button')
        this.modeSwitchButtonsMobile = document.querySelectorAll('.mobile_menu .product_select_button')
        this.setDoorModeBtn = document.querySelector('.door_tab-btn')
        this.setWindowModeBtn = document.querySelector('.window_tab-btn')
        console.log(frames)



        // Mobile
        this.mobileMenuToggle = document.querySelector('.conf_mobile_menu-toggle')
        this.mobileMenu = document.querySelector('.mobile_menu')
        this.mobileModalContents = document.querySelector('.mobile_tools-bar')
        this.mobileSettingsTitle = document.querySelector('.mobile_settings_title')
        this.getQuoteMobile = document.querySelector('.summary_mobile');
        this.mobileMenuItems = document.querySelector('.mobile_menu-items');


        // Door Menus
        this.doorItemMenus = [
            {
                id: 0,
                title: 'House Front',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                            </svg>  
                        </span>`,
                content: `<!-- Upload House Front -->
                    <form class="upload-house">
                        <label for="house-sample" class="house-sample">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                </svg>
                            </span>
                            Upload House Front
                            <input type="file" id="house-sample" name="house-sample">
                        </label>
                    </form>
                    <!-- House fronts -->
                    <ul class="house-fronts">
                        ${houseFronts.map(front => (
                    `<li class="house-front">
                        <span class="selected">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                  </svg>                                  
                            </span>
                            <div class="blurred-img"><img src=${front.image.single} onload="handleLoad(event)" loading="lazy" alt=""></div>
                        </li>`
                )).join('')}
                    </ul>`
            },
            {
                id: 1,
                title: 'Door Frames',
                icon: ` <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                            </svg>
                    </span>`,
                content: `<ul class="door-frames">
                        
                        ${frames.map(frame => (
                    `<li class="door-frame ">
                            <span class="selected">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                  </svg>                                  
                            </span>
                            <img src=${frame.image}  alt="">
                            <small>${frame.title}</small>
                        </li>`
                )).join('')}
                     </ul>`
            },
            {
                id: 2,
                title: 'Dimension',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                            </svg>
                        </span>`,
                content: `<div class="units">
                        <form class="units-form">
                            <div class="door-units unit-box">
                            <span>Door units:</span>
                                <div class="form-group">
                                    <input type="number" id="width" placeholder="Width">
                                </div>
                                <div class="form-group">
                                    <input type="number" id="height" placeholder="Height">
                                </div>
                            </div>
                            <div class="side-panel-1-units unit-box">
                            <span>Side Panel 1:</span>
                                <div class="form-group">
                                    <input type="number" id="width" placeholder="Width">
                                </div>
                            </div>
                            <div class="side-panel-1-units unit-box">
                            <span>Side Panel 2:</span>
                                <div class="form-group">
                                    <input type="number" id="width" placeholder="Width">
                                </div>
                            </div>
                            <input type="submit" id="save-units" value="Save" class="btn btn-secondary">
                         </form>    
                     </div>
                </div>`
            },
            {
                id: 3,
                title: 'Catalog',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                        </span>`,
                content: `<div class="catalog-select">
                                <div class="select-menu">
                                    <small>Select a Catalog</small>
                                    <select>
                                        ${catalogs.map((cat, i) => (`<option value=${cat.id} ${i === this.currentCatalog ? 'selected' : ''}>${cat.title}</option>`)).join('')}
                                    </select>
                                </div>
                                <div id="tabs">
                                    <div class="tab-buttons"></div>
                                    <div class="tab-content"></div>
                                </div>
                        </div>`
            },

            {
                id: 4,
                title: 'Glasses',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                            </svg>
                        </span>`,
                content: `<div class="glass-select">
                            <div id="tabs">
                                    <div class="tab-buttons"></div>
                                    <div class="tab-content"></div>
                                </div>
                        </div>`
            },
            {
                id: 5,
                title: 'Colors',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
                            </svg>
                        </span>`,
                content: `<div class="color-contents">
                <div class="view-switch-buttons">
                    <button data-id="outdoor">Outdoor View</button>
                    <button data-id="indoor">Indoor View</button>
                </div>
                 <div class="color-tabs">
                            <div class="color-tab-buttons">
                                <button>
                                    Color
                                </button>
                                <button class="">
                                    Decor
                                </button>
                            </div>
                            <div class="color-tab-contents"></div>
                        </div>
                </div>
                `
            },
            {
                id: 6,
                title: 'Handles',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                            </svg>
                        </span>`,
                content: `<ul class="accordion-wrap handle-accordion">
                        ${handles.map(handle => (
                    `<li class="accordion-content ${handle.title.toLowerCase().replace(/\s+/g, '-')}-content">                          
                                    <div class="accordion-content-header handle-accordion-header">
                                        <p>${handle.title}</p>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="handles">
                                        ${handle.types.map((type) => (`
                                            <li class='handle'>
                                                <span class="selected">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>                                  
                                                </span>
                                                <img src=${type.image} alt=${type.title} >
                                                <small>${type.title}</small>
                                            </li>`)).join('')}
                                    </ul>
                                </li> `
                )).join('')}
                     </ul>`
            },
            {
                id: 7,
                title: 'Options',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </span>`,
                content: `<div class="options">
                        <div class="view-switch-buttons">
                            <button data-id="outdoor">Outdoor View</button>
                            <button data-id="indoor">Indoor View</button>
                        </div>
                        <ul class="accordion-wrap handle-accordion">
                        ${handles.map(handle => (
                    `<li class="accordion-content ${handle.title.toLowerCase().replace(/\s+/g, '-')}-content">                          
                                    <div class="accordion-content-header handle-accordion-header">
                                        <p>${handle.title}</p>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="handles">
                                        ${handle.types.map((type) => (`
                                            <li class='handle'>
                                                <span class="selected">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>                                  
                                                </span>
                                                <img src=${type.image} alt=${type.title} >
                                                <small>${type.title}</small>
                                            </li>`)).join('')}
                                    </ul>
                                </li> `
                )).join('')}
                     </ul>
                </div>`
            },
            {
                id: 8,
                title: 'Done',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                            </svg>
                        </span>`,
                content: `<div class="summary_wrapper">
                        <div class="download_pdf">
                            <p>Get a summary of all your selections on a PDF with images included.</p>
                            <button class="btn btn-outline">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                </span>
                                <p>Download PDF</p>
                            </button>
                        </div>
                        <form class="quote_form">
                            <div class="quote_form-heading">
                                <p>Request an individual offer for your model selection:</p>
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <label for="firstname">First Name</label>
                                    <input type="text" name="firstname" id="firstname" placeholder="First Name">
                                </div>
                                <div class="form-group">
                                    <label for="lastname">Last Name</label>
                                    <input type="text" name="lastname" id="lastname" placeholder="Last Name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label>
                                <input type="text" name="address" id="address" placeholder="Address">
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <label for="zip-code">Zip Code</label>
                                    <input type="text" name="zip-code" id="zip-code" placeholder="Zip Code">
                                </div>
                                <div class="form-group">
                                    <label for="town">Town</label>
                                    <input type="text" name="town" id="town" placeholder="Town">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="state">State</label>
                                <input type="text" name="state" id="state" placeholder="State">
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone</label>
                                <input type="number" name="phone" id="phone" placeholder="Telephone">
                            </div>
                            <div class="form-group">
                                <label for="email">Phone</label>
                                <input type="email" name="email" id="email" placeholder="Email">
                            </div>
                            <input type="submit" value="Send Quote" class="btn btn-secondary mt-2">
                        </form>
                    </div>`
            },

        ]


        // Window Menus
        this.windowItemMenus = [
            {
                id: 0,
                title: 'Window Frames',
                icon: ` <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z" />
                        </svg>
                    </span>`,
                content: `<ul class="window-frames">
                        
                        ${windowFrames.map(frame => (
                    `<li class="window-frame ">
                            <span class="selected">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                  </svg>                                  
                            </span>
                           <div class="blurred-img"><img src=${frame.image} onload="handleLoad(event)" loading="lazy" alt=""></div>
                            <small>${frame.title}</small>
                        </li>`
                )).join('')}
                     </ul>`
            },
            {
                id: 1,
                title: 'Dimension',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                            </svg>
                        </span>`,
                content: `<p>Window Dimensions</p>`
            },
            {
                id: 2,
                title: 'Profile & Impact',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                        </svg>`,
                content: `<p>Profile Type, Scale</p>`
            },
            {
                id: 3,
                title: 'Color',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
                            </svg>
                        </span>`,
                content: `<p>Window Colors</p>`
            },
            {
                id: 4,
                title: 'Filling',
                icon: `<span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                        </svg>
                        </span>`,
                content: `<p>Glass type, Rods</p>`
            },
            {
                id: 5,
                title: 'Properties',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        </span>`,
                content: `<p>Distribution, Ventilation grille, Direction & rotaton sequence, Insect screen, Crutch, Pre-Drilling(free)</p>`
            },
            {
                id: 6,
                title: 'Done',
                icon: `<span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                            </svg>
                        </span>`,
                content: `<div class="summary_wrapper">
                        <div class="download_pdf">
                            <p>Get a summary of all your selections on a PDF with images included.</p>
                            <button class="btn btn-outline">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                </span>
                                <p>Download PDF</p>
                            </button>
                        </div>
                        <form class="quote_form">
                            <div class="quote_form-heading">
                                <p>Request an individual offer for your model selection:</p>
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <label for="firstname">First Name</label>
                                    <input type="text" name="firstname" id="firstname" placeholder="First Name">
                                </div>
                                <div class="form-group">
                                    <label for="lastname">Last Name</label>
                                    <input type="text" name="lastname" id="lastname" placeholder="Last Name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label>
                                <input type="text" name="address" id="address" placeholder="Address">
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <label for="zip-code">Zip Code</label>
                                    <input type="text" name="zip-code" id="zip-code" placeholder="Zip Code">
                                </div>
                                <div class="form-group">
                                    <label for="town">Town</label>
                                    <input type="text" name="town" id="town" placeholder="Town">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="state">State</label>
                                <input type="text" name="state" id="state" placeholder="State">
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone</label>
                                <input type="number" name="phone" id="phone" placeholder="Telephone">
                            </div>
                            <div class="form-group">
                                <label for="email">Phone</label>
                                <input type="email" name="email" id="email" placeholder="Email">
                            </div>
                            <input type="submit" value="Send Quote" class="btn btn-secondary mt-2">
                        </form>
                    </div>`
            },

        ]

    }


    init = () => {
        // onload events
        this.setAppMode()
        this.displayMenuItems()
        this.handleDynamicMenuButtonClick()
        // this.showSettingsModal('House Front', 0)
        this.showMobileSettingsModal('House Front', 0)
        // this.modalWrapper.classList.add('showModal')
        this.getCurrentToolsBarContent()
        // set menu active state onload for both desktop and mobile
        // this.loadActiveStates()
    }


    loadEvents = () => {
        // Event Listeners
        this.closeSettingsModalBtn.addEventListener('click', this.closeSettingsModal)
        this.mobileMenuToggle.addEventListener('click', this.handleMobilemenuToggle)
        this.prevMenu.addEventListener('click', this.handlePrevClick)
        this.nextMenu.addEventListener('click', this.handleNextClick)
        this.getQuoteMobile.addEventListener('click', () => {
            const doorDoneMenu = this.doorItemMenus.length - 1
            const windowsDoneMenu = this.windowItemMenus.length - 1

            this.handleGetQuote(doorDoneMenu, windowsDoneMenu)

        })
        this.getQuoteDesktop.addEventListener('click', () => {
            const doorDoneMenu = this.doorItemMenus.length - 1
            const windowsDoneMenu = this.windowItemMenus.length - 1

            this.handleGetQuote(doorDoneMenu, windowsDoneMenu)

        })

        this.goFullScreenBtn.addEventListener('click', this.requestFullScreen)
    }





    handleGetQuote = (doorDoneMenu, windowsDoneMenu) => {
        this.settingsTitle = 'Done'
        if (this.appCurrentMode === 'door') {
            this.showSettingsModal('Done', doorDoneMenu)
            this.showMobileSettingsModal('Done', doorDoneMenu)

            this.sidebarSettingsModal.classList.remove('showModal')

            setTimeout(() => {
                this.modalWrapper.classList.add('showModal')
                this.sidebarSettingsModal.classList.add('showModal')

            }, 40)
            const desktopActiveItems = this.desktopMenuItems.querySelectorAll('.sidebar_menu-item');
            desktopActiveItems.forEach(btn => btn.classList.remove('active'));
            desktopActiveItems[doorDoneMenu].classList.add('active')
            this.currentMenuItem = doorDoneMenu;
        }
        if (this.appCurrentMode === 'window') {
            this.showSettingsModal('Done', windowsDoneMenu)
            this.showMobileSettingsModal('Done', windowsDoneMenu)

            this.sidebarSettingsModal.classList.remove('showModal')

            setTimeout(() => {
                this.modalWrapper.classList.add('showModal')
                this.sidebarSettingsModal.classList.add('showModal')

            }, 40)
            const desktopActiveItems = this.desktopMenuItems.querySelectorAll('.sidebar_menu-item');
            desktopActiveItems.forEach(btn => btn.classList.remove('active'));
            desktopActiveItems[windowsDoneMenu].classList.add('active')
            this.currentMenuItem = windowsDoneMenu;
        }


    }










    // Methods
    setAppMode = () => {
        if (this.appCurrentMode === 'door') {
            this.modeSwitchButtonsDesktop[0].classList.add('active');
            this.modeSwitchButtonsMobile[0].classList.add('active');
        } else if (this.appCurrentMode === 'window') {
            this.modeSwitchButtonsDesktop[1].classList.add('active');
            this.modeSwitchButtonsMobile[1].classList.add('active');
        }

        const switchMode = (mode, index) => {
            this.modeSwitchButtonsDesktop.forEach(btn => btn.classList.remove('active'));
            this.modeSwitchButtonsMobile.forEach(btn => btn.classList.remove('active'));

            this.appCurrentMode = mode.toLowerCase();

            this.modeSwitchButtonsDesktop[index].classList.add('active');
            this.modeSwitchButtonsMobile[index].classList.add('active');

            // Update the menu items based on the current mode
            this.displayMenuItems();
            this.currentMenuItem = 0


            // Reapply the active class to the first menu item
            const desktopMenuItems = document.querySelectorAll('.sidebar_menu-item');
            desktopMenuItems[this.currentMenuItem].classList.add('active');
            // Update Settings title for desktop
            const currentDesktopSettingsTitle = desktopMenuItems[this.currentMenuItem].firstElementChild.children[1].textContent;
            this.showSettingsModal(currentDesktopSettingsTitle, this.currentMenuItem)
            this.modalWrapper.classList.add('showModal')


            const mobileMenuItems = document.querySelectorAll('.mobile_menu-item');
            mobileMenuItems[this.currentMenuItem].classList.add('active');
            // Update settings title for mobile
            const currentMobileSettingsTitle = mobileMenuItems[this.currentMenuItem].firstElementChild.children[1].textContent;
            this.showMobileSettingsModal(currentMobileSettingsTitle, this.currentMenuItem)
        };

        this.modeSwitchButtonsDesktop.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                switchMode(e.target.textContent, index);
                this.getCurrentToolsBarContent()

            });
        });

        this.modeSwitchButtonsMobile.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                switchMode(e.target.textContent, index);
                this.getCurrentToolsBarContent()

            });
        });
    };

    // Switch door view 
    RotateAppView = () => {
        const switchBtnsDesktop = document.querySelectorAll('.tools_sidebar-content .view-switch-buttons button');
        const switchBtnsMobile = document.querySelectorAll('.mobile_tools-bar .view-switch-buttons button');

        if (this.currentAppView.toLowerCase() === 'outdoor') {
            switchBtnsDesktop[0].classList.add('active')
            switchBtnsMobile[0].classList.add('active')
        } else if (this.currentAppView.toLowerCase() === 'indoor') {
            switchBtnsDesktop[1].classList.add('active')
            switchBtnsMobile[1].classList.add('active')
        }

        const handleButtonSwitch = (btn, index, btnQuery) => {
            btn.addEventListener('click', () => {
                switchBtnsDesktop.forEach(btn => btn.classList.remove('active'))
                switchBtnsMobile.forEach(btn => btn.classList.remove('active'))

                btn.classList.add('active')
                btnQuery[index].classList.add('active')

                if (btn.dataset.id === 'outdoor') {
                    if (this.currentAppView.toLowerCase() === 'outdoor') return;
                    this.currentAppView = 'outdoor'
                    // rotate to show outdoor view
                    alert('switched to outdoor mode')
                }

                if (btn.dataset.id === 'indoor') {
                    if (this.currentAppView.toLowerCase() === 'indoor') return;
                    this.currentAppView = 'indoor'
                    // rotate to show indoor view
                    alert('switched to indoor mode')
                }
            })
        }
        switchBtnsDesktop.forEach((btn, index) => {
            handleButtonSwitch(btn, index, switchBtnsMobile)
        })

        switchBtnsMobile.forEach((btn, index) => {
            handleButtonSwitch(btn, index, switchBtnsDesktop)
        })


    }


    loadActiveStates = () => {
        console.log('loaded');
        this.desktopMenuButtons = this.desktopMenuItems.querySelectorAll('.sidebar_menu-item');
        this.mobileMenuButtons = this.mobileMenu.querySelectorAll('.mobile_menu-item');
        this.desktopMenuButtons[this.currentMenuItem].classList.add('active')
        this.mobileMenuButtons[this.currentMenuItem].classList.add('active')
    }







    displayMenuItems = () => {
        console.log('yes')
        // check if you are in door or window mode to know menu to be displayed
        // By checking current mode - this.appCurrentMode
        // If door mode use the Door Item menus
        // Listen for clicks on the menu items
        if (this.appCurrentMode === 'door') {
            this.desktopMenuItems.innerHTML = this.doorItemMenus.map(menu => (
                `<li class="sidebar_menu-item" data-id="${menu.id}">
                        <div>
                            ${menu.icon}
                            <span>${menu.title}</span>
                        </div>
                        <span class="point-svg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </span>
                    </li>`
            )).join('')

            this.mobileMenuItems.innerHTML = this.doorItemMenus.map(menu => (
                `<li class="mobile_menu-item" data-id="${menu.id}">
                        <div>
                            ${menu.icon}
                            <span>${menu.title}</span>
                        </div>
                        <span class="point-svg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </span>
                    </li>`
            )).join('')
        } else if (this.appCurrentMode === 'window') {
            this.desktopMenuItems.innerHTML = this.windowItemMenus.map(menu => (
                `<li class="sidebar_menu-item" data-id="${menu.id}">
                        <div>
                            ${menu.icon}
                            <span>${menu.title}</span>
                        </div>
                        <span class="point-svg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </span>
                    </li>`
            )).join('')

            this.mobileMenuItems.innerHTML = this.windowItemMenus.map(menu => (
                `<li class="mobile_menu-item" data-id="${menu.id}">
                        <div>
                            ${menu.icon}
                            <span>${menu.title}</span>
                        </div>
                        <span class="point-svg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </span>
                    </li>`
            )).join('')
        }
    }


    handleDynamicMenuButtonClick = () => {
        this.desktopMenuItems.addEventListener('click', (e) => {

            let button = e.target;

            // Traverse up the DOM to find the nearest element with the class 'sidebar_menu-item'
            while (button && !button.classList.contains('sidebar_menu-item')) {
                button = button.parentElement;
            }

            if (button) {
                // Remove the 'active' class from all currently active menu items
                const desktopActiveItems = this.desktopMenuItems.querySelectorAll('.sidebar_menu-item');
                desktopActiveItems.forEach(item => item.classList.remove('active'));


                this.currentMenuItem = +button.dataset.id;
                this.closeSettingsModal();

                this.settingsTitle = button.children[0].lastElementChild.textContent;
                button.classList.add('active');
                this.modalWrapper.classList.add('showModal');


                setTimeout(() => {
                    this.showSettingsModal(this.settingsTitle, this.currentMenuItem);
                    this.showMobileSettingsModal(this.settingsTitle, this.currentMenuItem);
                    this.getCurrentToolsBarContent()
                }, 40);
                // Change active states for desktop responsive screens
                const mobileActiveItems = this.mobileMenu.querySelectorAll('.mobile_menu-item');
                mobileActiveItems.forEach(item => item.classList.remove('active'));
                mobileActiveItems[this.currentMenuItem].classList.add('active')
                console.log(this.currentMenuItem);

            }
        });

        this.mobileMenu.addEventListener('click', (e) => {
            let button = e.target;

            // Traverse up the DOM to find the nearest element with the class 'sidebar_menu-item'
            while (button && !button.classList.contains('mobile_menu-item')) {
                button = button.parentElement;
            }

            if (button) {
                // Remove the 'active' class from all currently active menu items
                this.handleMobilemenuToggle()
                const mobileActiveItems = this.mobileMenu.querySelectorAll('.mobile_menu-item');
                mobileActiveItems.forEach(item => item.classList.remove('active'));

                this.currentMenuItem = +button.dataset.id;

                this.settingsTitle = button.children[0].lastElementChild.textContent;
                button.classList.add('active');

                this.showMobileSettingsModal(this.settingsTitle, this.currentMenuItem)
                this.showSettingsModal(this.settingsTitle, this.currentMenuItem)
                this.getCurrentToolsBarContent()


                // Change active states for desktop responsive screens
                const desktopActiveItems = this.desktopMenuItems.querySelectorAll('.sidebar_menu-item');
                desktopActiveItems.forEach(item => item.classList.remove('active'));
                desktopActiveItems[this.currentMenuItem].classList.add('active')


                this.modalWrapper.classList.add('showModal')
            }
        });
    }




    handleMobilemenuToggle = (e) => {
        console.log('yes');
        this.mobileMenu.classList.toggle('show_mobile_menu')
    }

    handlePrevClick = () => {
        const desktopActiveItems = this.desktopMenuItems.querySelectorAll('.sidebar_menu-item');

        if (this.currentMenuItem <= 0) return;
        this.currentMenuItem--
        this.settingsTitle = desktopActiveItems[this.currentMenuItem].children[0].lastElementChild.textContent
        this.sidebarSettingsModal.classList.remove('showModal')


        setTimeout(() => {
            this.showSettingsModal(this.settingsTitle, this.currentMenuItem)
            this.showMobileSettingsModal(this.settingsTitle, this.currentMenuItem)
            this.getCurrentToolsBarContent()
        }, 40);

        desktopActiveItems.forEach(item => item.classList.remove('active'));
        desktopActiveItems[this.currentMenuItem].classList.add('active')

        // Change active states for mobile responsive screens
        const mobileActiveItems = this.mobileMenu.querySelectorAll('.mobile_menu-item');
        mobileActiveItems.forEach(item => item.classList.remove('active'));
        mobileActiveItems[this.currentMenuItem].classList.add('active')


    }


    handleNextClick = () => {
        const desktopActiveItems = this.desktopMenuItems.querySelectorAll('.sidebar_menu-item');
        const menuLength = desktopActiveItems.length - 1
        if (this.currentMenuItem >= menuLength) return;
        this.currentMenuItem++
        console.log(this.currentMenuItem);
        this.settingsTitle = desktopActiveItems[this.currentMenuItem].children[0].lastElementChild.textContent

        this.sidebarSettingsModal.classList.remove('showModal')

        setTimeout(() => {
            this.showSettingsModal(this.settingsTitle, this.currentMenuItem)
            this.showMobileSettingsModal(this.settingsTitle, this.currentMenuItem)
            this.getCurrentToolsBarContent()

        }, 40);

        desktopActiveItems.forEach(item => item.classList.remove('active'));
        desktopActiveItems[this.currentMenuItem].classList.add('active')

        // Change active states for mobile responsive screens
        const mobileActiveItems = this.mobileMenu.querySelectorAll('.mobile_menu-item');
        mobileActiveItems.forEach(item => item.classList.remove('active'));
        mobileActiveItems[this.currentMenuItem].classList.add('active')

    }



    showSettingsModal = (title, id) => {
        // if title matches show settings for title
        // loop through the Sidebar menu items
        // if the id passed matches the id of the menu item to display, show that item
        // Try to make this
        this.sidebarModalContents.scrollTop = 0;
        this.sidebarSettingsModal.firstElementChild.firstElementChild.innerText = title
        if (this.appCurrentMode === 'door') {
            this.doorItemMenus.forEach((menu) => {
                if (menu.id === id) {
                    this.sidebarModalContents.innerHTML = menu.content
                }
            })
        } else if (this.appCurrentMode === 'window') {
            this.windowItemMenus.forEach((menu) => {
                if (menu.id === id) {
                    this.sidebarModalContents.innerHTML = menu.content
                }
            })
        }


        this.sidebarSettingsModal.classList.add('showModal')
    }



    showMobileSettingsModal = (title, id) => {
        this.mobileModalContents.scrollTop = 0;
        this.mobileSettingsTitle.innerText = title

        if (this.appCurrentMode === 'door') {
            this.doorItemMenus.forEach((menu) => {
                if (menu.id === id) {
                    this.mobileModalContents.innerHTML = menu.content
                }
            })
        } else if (this.appCurrentMode === 'window') {
            this.windowItemMenus.forEach((menu) => {
                if (menu.id === id) {
                    this.mobileModalContents.innerHTML = menu.content
                }
            })
        }

    }




    closeSettingsModal = () => {
        document.querySelectorAll('.sidebar_menu-item').forEach(btn => btn.classList.remove('active'));

        this.sidebarSettingsModal.classList.remove('showModal')
        this.modalWrapper.classList.remove('showModal')
    }


    requestFullScreen = () => {
        if (this.houseFrontPreviewImg.requestFullscreen) {
            this.houseFrontPreviewImg.requestFullscreen();
        } else if (this.houseFrontPreviewImg.webkitRequestFullscreen) { // Safari
            this.houseFrontPreviewImg.webkitRequestFullscreen();
        } else if (this.houseFrontPreviewImg.msRequestFullscreen) { // IE11
            this.houseFrontPreviewImg.msRequestFullscreen();
        }

    }

    getCurrentToolsBarContent = () => {
        this.handleHouseFrontSelection()
        this.handleDoorFrameSelection()
        this.handleCatalogTabs(this.selectedFrameForm)
        this.handleGlassTabs(this.selectedFrameForm)
        this.handleColorsSection()
        this.handleKeyHandleSelection()
        this.handleOptionsSelection()
    }






    handleCatalogTabs = (form) => {
        if (this.settingsTitle.toLowerCase() === 'catalog') {

            const tabButtons = document.querySelectorAll('.tab-buttons');
            const tabContents = document.querySelectorAll('.tab-content');

            const loadTabContent = (itemType) => {
                tabContents.forEach(tabContent => {
                    tabContent.innerHTML = '';

                    const content = itemType === 0 ? '' : (`<ul class="door_model-images">
                       ${catalogs[this.currentCatalog].models.map((model, index) => (
                        `<li class="door_model-image ${this.currentSelectedDoorIndices[this.currentDoorTab] === index ? 'active' : ''}">
                                <span class="selected">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                      </svg>                                  
                                </span>
                                <div class="blurred-img"><img src=${model.image} onload="handleLoad(event)" loading="lazy" alt=""></div>
                                <small>${model.modelNumber}</small>
                            </li>`
                    )).join('')}
                        </ul>`);
                    tabContent.innerHTML = `${content}`;

                    const allModels = tabContent.querySelectorAll('.door_model-images .door_model-image');
                    allModels.forEach((model, index) => {
                        model.addEventListener('click', () => {
                            this.currentSelectedDoorIndices[this.currentDoorTab] = index;
                            allModels.forEach(model => model.classList.remove('active'));
                            allModels[this.currentSelectedDoorIndices[this.currentDoorTab]].classList.add('active');

                            // call your update func here
                        });
                    });
                });
            }

            const catalogSelect = document.querySelectorAll('.select-menu select');
            const updateSelectedCatalog = () => {
                this.doorItemMenus[3].content = `<div class="catalog-select">
                                            <div class="select-menu">
                                                <small>Select a Catalog</small>
                                                <select>
                                                    ${catalogs.map((cat, i) => (`<option value=${cat.id} ${i === this.currentCatalog ? 'selected' : ''}>${cat.title}</option>`)).join('')}
                                                </select>
                                            </div>
                                            <div id="tabs">
                                                <div class="tab-buttons"></div>
                                                <div class="tab-content"></div>
                                            </div>
                                    </div>`

            }

            const handleCatalogSelect = (e) => {
                // Update the current catalog and perform necessary updates
                this.currentCatalog = +e.target.value;
                updateSelectedCatalog();
                this.getCurrentToolsBarContent();
                console.log(e.target.value);

                // After handling the event, remove the event listener
                catalogSelect.forEach(cat => {
                    cat.removeEventListener('change', handleCatalogSelect);
                });
            };

            // Attach the event listener
            catalogSelect.forEach((cat) => {
                cat.addEventListener('change', handleCatalogSelect);
            });


            if (form.length > 1) {

                tabButtons.forEach(tabButtonContainer => {
                    tabButtonContainer.innerHTML = '';

                    let firstDoorTabButton = null;

                    // Draw Tab Buttons
                    form.forEach((item, index) => {
                        if (this.currentMenuItem === 3 && item === 0) {
                            // Skip creating tab buttons for Right Panel and Left Panel
                            return;
                        }

                        const tabButton = document.createElement('button');
                        if (item === 0) {
                            tabButton.innerText = index === 0 ? 'Left Panel' : 'Right Panel';
                        } else {
                            tabButton.innerText = 'Door';
                            if (!firstDoorTabButton) {
                                firstDoorTabButton = tabButton;
                            }
                        }

                        tabButton.addEventListener('click', () => {
                            document.querySelectorAll('.tab-buttons button').forEach((btn) => {
                                btn.classList.remove('active');
                            });
                            tabButton.classList.add('active');
                            this.currentDoorTab = index;
                            loadTabContent(item);
                            console.log(this.currentSelectedDoorIndices);
                        });
                        tabButtonContainer.appendChild(tabButton);
                    });

                    // Set the first "Door" tab as active by default
                    if (firstDoorTabButton) {
                        firstDoorTabButton.classList.add('active');
                        this.currentDoorTab = this.selectedFrameForm.indexOf(1); // Initialize the current tab correctly
                        loadTabContent(1); // Load "Door" content by default
                    }
                });

            } else {
                tabButtons.forEach(tabButtonContainer => {
                    tabButtonContainer.style.display = 'none';
                });
                // Set the default tab content when there's no tab button
                loadTabContent(form[0]);
            }
        }
    }





    handleGlassTabs = (form) => {
        if (this.settingsTitle.toLowerCase() === 'glasses') {

            const tabContents = document.querySelectorAll('.tab-content');
            const tabButtons = document.querySelectorAll('.tab-buttons');

            const loadTabContent = (itemType) => {
                tabContents.forEach(tabContent => {
                    tabContent.innerHTML = '';

                    const content = itemType === 0 ? (`
                        <ul class="door_glasses-images">
                            ${glasses.map((glass, index) => (
                        `<li class="door_glasses-image ${this.currentSelectedGlassIndices[this.currentGlassTab] === index ? 'active' : ''}">
                                    <span class="selected">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>                                  
                                    </span>
                                    <div class="blurred-img"><img src=${glass.image} onload="handleLoad(event)" loading="lazy" alt=""></div>
                                    <small>${glass.title}</small>
                                </li>`
                    )).join('')}
                        </ul>
                    `) : (`
                        <ul class="door_glasses-images">
                            ${glasses.map((glass, index) => (
                        `<li class="door_glasses-image ${this.currentSelectedGlassIndices[this.currentGlassTab] === index ? 'active' : ''}">
                                    <span class="selected">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>                                  
                                    </span>
                                    <div class="blurred-img"><img src=${glass.image} onload="handleLoad(event)" loading="lazy" alt=""></div>
                                    <small>${glass.title}</small>
                                </li>`
                    )).join('')}
                        </ul>
                    `);

                    tabContent.innerHTML = `${content}`;

                    const allGlasses = tabContent.querySelectorAll('.door_glasses-images .door_glasses-image');
                    allGlasses.forEach((glass, index) => {
                        glass.addEventListener('click', () => {
                            this.currentSelectedGlassIndices[this.currentGlassTab] = index;
                            allGlasses.forEach(glass => glass.classList.remove('active'));
                            allGlasses[this.currentSelectedGlassIndices[this.currentGlassTab]].classList.add('active');
                        });
                    });
                });
            }

            if (form.length > 1) {
                tabButtons.forEach(tabButtonContainer => {
                    tabButtonContainer.innerHTML = '';
                    let firstDoorTabButton = null;

                    form.forEach((item, index) => {
                        const tabButton = document.createElement('button');
                        if (item === 0) {
                            tabButton.innerText = index === 0 ? 'Left Panel' : 'Right Panel';
                        } else {
                            tabButton.innerText = 'Door';
                            if (!firstDoorTabButton) {
                                firstDoorTabButton = tabButton;
                            }
                        }

                        tabButton.addEventListener('click', () => {
                            document.querySelectorAll('.tab-buttons button').forEach((btn) => {
                                btn.classList.remove('active');
                            });
                            tabButton.classList.add('active');
                            this.currentGlassTab = index;
                            loadTabContent(item);
                            console.log(this.currentSelectedGlassIndices);
                        });
                        tabButtonContainer.appendChild(tabButton);
                    });

                    // Set the first "Door" tab as active by default
                    if (firstDoorTabButton) {
                        firstDoorTabButton.classList.add('active');
                        this.currentGlassTab = this.selectedFrameForm.indexOf(1); // Initialize the current tab correctly
                        loadTabContent(1); // Load "Door" content by default
                    }
                });
            } else {
                tabButtons.forEach(tabButtonContainer => {
                    tabButtonContainer.style.display = 'none';
                });
                // Set the default tab content when there's no tab button
                loadTabContent(form[0]);
            }
        }
    }




    handleColorsSection = () => {
        if (this.settingsTitle.toLowerCase() === 'colors') {
            const tabButtonsDesktop = document.querySelectorAll('.tools_sidebar-content .color-tab-buttons button');
            const tabContentsDesktop = document.querySelectorAll('.tools_sidebar-content .color-tab-contents');

            const tabButtonsMobile = document.querySelectorAll('.mobile_tools-bar .color-tab-buttons button');
            const tabContentsMobile = document.querySelectorAll('.mobile_tools-bar .color-tab-contents');



            const loadTabContent = (itemType) => {
                if (tabButtonsDesktop.length > 0 && tabContentsDesktop.length > 0) {
                    tabContentsDesktop.forEach(tabContent => {
                        tabContent.innerHTML = '';

                        const content = itemType === 0 ? (`
                            <ul class="color-tab-content">
                                <li class="color-content">
                                    <div class="color-content-header">
                                        <p>Door color</p>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="colors door-colors">
                                        ${colors.map(color => (`
                                            <li class="color" style="background: ${color.code}">
                                                <span class="selected">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>                                  
                                                </span>
                                                <small>${color.code}</small>
                                            </li>`)).join('')}
                                    </ul>
                                </li>                  
                                <li class="color-content">
                                    <div class="color-content-header">
                                        <p>Frame color</p>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="colors frame-colors">
                                        ${colors.map(color => (`
                                            <li class="color" style="background: ${color.code}">
                                                <span class="selected">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>                                  
                                                </span>
                                                <small>${color.code}</small>
                                            </li>`)).join('')}
                                    </ul>
                                </li>                                    
                             </ul>`) : (`
                             <ul class="color-tab-content decor-tab-content">
                                <li class="color-content decor-content">
                                    <div class="color-content-header decor-content-header">
                                        <p>Door decor</p>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="decors door-decors">
                                        ${decors.map(decor => (`
                                            <li class="decor">
                                                <span class="selected">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>                                  
                                                </span>
                                                <img src=${decor.image} alt=${decor.title} >
                                            </li>`)).join('')}
                                    </ul>
                                </li>                  
                                <li class="color-content">
                                    <div class="color-content-header">
                                        <p>Frame decor</p>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="decors frame-decors">
                                        ${decors.map(decor => (`
                                            <li class="decor">
                                                <span class="selected">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>                                  
                                                </span>
                                                <img src=${decor.image} alt=${decor.title} >
                                            </li>`)).join('')}
                                    </ul>
                                </li>                                    
                             </ul>`);

                        tabContent.innerHTML = `${content}`;
                    });
                }

                if (tabButtonsMobile.length > 0 && tabContentsMobile.length > 0) {
                    tabContentsMobile.forEach(tabContent => {
                        tabContent.innerHTML = '';

                        const content = itemType === 0 ? (`
                            <ul class="color-tab-content">
                                <li class="color-content">
                                    <div class="color-content-header">
                                        <p>Door color</p>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="colors door-colors">
                                        ${colors.map(color => (`
                                            <li class="color" style="background: ${color.code}">
                                                <span class="selected">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>                                  
                                                </span>
                                                <small>${color.code}</small>
                                            </li>`)).join('')}
                                    </ul>
                                </li>                  
                                <li class="color-content">
                                    <div class="color-content-header">
                                        <p>Frame color</p>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="colors frame-colors">
                                        ${colors.map(color => (`
                                            <li class="color" style="background: ${color.code}">
                                                <span class="selected">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>                                  
                                                </span>
                                                <small>${color.code}</small>
                                            </li>`)).join('')}
                                    </ul>
                                </li>                                    
                             </ul>`) : (`
                             <ul class="color-tab-content decor-tab-content">
                                <li class="color-content decor-content">
                                    <div class="color-content-header decor-content-header">
                                        <p>Door decor</p>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="decors door-decors">
                                        ${decors.map(decor => (`
                                            <li class="decor">
                                                <span class="selected">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>                                  
                                                </span>
                                                <img src=${decor.image} alt=${decor.title} >
                                            </li>`)).join('')}
                                    </ul>
                                </li>                  
                                <li class="color-content">
                                    <div class="color-content-header">
                                        <p>Frame decor</p>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="decors frame-decors">
                                        ${decors.map(decor => (`
                                            <li class="decor">
                                                <span class="selected">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>                                  
                                                </span>
                                                <img src=${decor.image} alt=${decor.title} >
                                            </li>`)).join('')}
                                    </ul>
                                </li>                                    
                             </ul>`);

                        tabContent.innerHTML = `${content}`;
                    });
                }
            };


            const handleTabButtonChange = (button, index) => {
                console.log('loaded');
                tabButtonsDesktop.forEach(btn => btn.classList.remove('active'));
                tabButtonsMobile.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                this.currentColorTab = index;
                loadTabContent(this.currentColorTab);
                toggleAccordion();
                this.getCurrentToolsBarContent();

                // Remove event listeners before adding new ones
                tabButtonsDesktop.forEach((button) => {
                    button.removeEventListener('click', handleDesktopClick);
                });
                tabButtonsMobile.forEach((button) => {
                    button.removeEventListener('click', handleMobileClick);
                });


            };

            // Define event handler functions
            const handleDesktopClick = (e) => {
                const button = e.target;
                const index = Array.from(tabButtonsDesktop).indexOf(button);
                handleTabButtonChange(button, index);
            };

            const handleMobileClick = (e) => {
                const button = e.target;
                const index = Array.from(tabButtonsMobile).indexOf(button);
                handleTabButtonChange(button, index);
            };



            // Add event listeners
            tabButtonsDesktop.forEach((button) => {
                tabButtonsDesktop[this.currentColorTab].classList.add('active');
                tabButtonsMobile[this.currentColorTab].classList.add('active');
                button.addEventListener('click', handleDesktopClick);
            });


            tabButtonsMobile.forEach((button) => {
                tabButtonsDesktop[this.currentColorTab]?.classList.add('active');
                tabButtonsMobile[this.currentColorTab]?.classList.add('active');
                button.addEventListener('click', handleMobileClick);
            });


            // Handle click on colors to set door or frame color
            const handleDoorColorClick = () => {
                const colorButtons = document.querySelectorAll('.door-colors .color')
                colorButtons.forEach(color => {
                    colorButtons[0].classList.add('active')
                    color.addEventListener('click', () => {
                        colorButtons.forEach(btn => btn.classList.remove('active'))
                        color.classList.add('active')
                        // set the door color
                    })
                })
            }

            // Handle Door Frame Click
            const handleFrameColorClick = () => {
                const colorButtons = document.querySelectorAll('.frame-colors .color')
                colorButtons.forEach(color => {
                    colorButtons[0].classList.add('active')
                    color.addEventListener('click', () => {
                        colorButtons.forEach(btn => btn.classList.remove('active'))
                        color.classList.add('active')
                        // set the door frame color
                    })
                })
            }
            // Handle Decor Color Click
            const handleDoorDecorClick = () => {
                const decorButtons = document.querySelectorAll('.door-decors .decor')
                decorButtons.forEach(decor => {
                    decorButtons[0].classList.add('active')
                    decor.addEventListener('click', () => {
                        decorButtons.forEach(btn => btn.classList.remove('active'))
                        decor.classList.add('active')
                        // set the door decor
                    })
                })
            }
            // Handle Decor frame Click
            const handleFrameDecorClick = () => {
                const decorButtons = document.querySelectorAll('.frame-decors .decor')
                decorButtons.forEach(decor => {
                    decorButtons[0].classList.add('active')
                    decor.addEventListener('click', () => {
                        decorButtons.forEach(btn => btn.classList.remove('active'))
                        decor.classList.add('active')
                        // set the frame decor
                    })
                })
            }

            const toggleAccordion = () => {
                const accordionWrapper = document.querySelectorAll('.color-content');
                const accordionButton = document.querySelectorAll('.color-content-header');
                const headerSvg = document.querySelectorAll('.color-content-header span svg');

                accordionButton.forEach((btn, index) => {
                    btn.addEventListener('click', () => {
                        // Close all other accordions
                        accordionWrapper.forEach((item, i) => {
                            if (i !== index) {
                                item.classList.remove('open');
                            }
                        });
                        headerSvg.forEach((item, i) => {
                            if (i !== index) {
                                item.classList.remove('open');
                            }
                        });

                        // Toggle the clicked accordion
                        accordionWrapper[index].classList.toggle('open');
                        headerSvg[index].classList.toggle('open');
                    });
                });
            };

            loadTabContent(this.currentColorTab);
            toggleAccordion();
            handleDoorColorClick()
            handleFrameColorClick()
            handleDoorDecorClick()
            handleFrameDecorClick()
            this.RotateAppView()
        }
    };




    handleKeyHandleSelection = () => {
        if (this.settingsTitle.toLowerCase() === 'handles') {


            const toggleAccordion = () => {
                const accordionWrapper = document.querySelectorAll('.accordion-content');
                const accordionButton = document.querySelectorAll('.accordion-content-header');
                const headerSvg = document.querySelectorAll('.accordion-content-header span svg');

                accordionButton.forEach((btn, index) => {
                    btn.addEventListener('click', () => {
                        // Close all other accordions
                        accordionWrapper.forEach((item, i) => {
                            if (i !== index) {
                                item.classList.remove('open');
                            }
                        });
                        headerSvg.forEach((item, i) => {
                            if (i !== index) {
                                item.classList.remove('open');
                            }
                        });

                        // Toggle the clicked accordion
                        accordionWrapper[index].classList.toggle('open');
                        headerSvg[index].classList.toggle('open');
                    });
                });
            };




            const handleItemsClick = () => {
                const handleButtons = document.querySelectorAll('.handles-content .handle')
                handleButtons.forEach(handle => {
                    handleButtons[0].classList.add('active')
                    handle.addEventListener('click', () => {
                        handleButtons.forEach(btn => btn.classList.remove('active'))
                        handle.classList.add('active')
                        // set the door handle
                    })
                })
            }

            const innerDruckerItemsClick = () => {
                const handleButtons = document.querySelectorAll('.inner-ducker-content .handle')
                handleButtons.forEach(handle => {
                    handleButtons[0].classList.add('active')
                    handle.addEventListener('click', () => {
                        handleButtons.forEach(btn => btn.classList.remove('active'))
                        handle.classList.add('active')
                        // set 
                    })
                })
            }

            const pzRosetteItemsClick = () => {
                const handleButtons = document.querySelectorAll('.pz-rosette-content .handle')
                handleButtons.forEach(handle => {
                    handleButtons[0].classList.add('active')
                    handle.addEventListener('click', () => {
                        handleButtons.forEach(btn => btn.classList.remove('active'))
                        handle.classList.add('active')
                        // set 
                    })
                })
            }

            toggleAccordion()
            handleItemsClick()
            innerDruckerItemsClick()
            pzRosetteItemsClick()
        }
    }



    handleOptionsSelection = () => {
        if (this.settingsTitle.toLowerCase() === 'options') {


            const toggleAccordion = () => {
                const accordionWrapper = document.querySelectorAll('.accordion-content');
                const accordionButton = document.querySelectorAll('.accordion-content-header');
                const headerSvg = document.querySelectorAll('.accordion-content-header span svg');

                accordionButton.forEach((btn, index) => {
                    btn.addEventListener('click', () => {
                        // Close all other accordions
                        accordionWrapper.forEach((item, i) => {
                            if (i !== index) {
                                item.classList.remove('open');
                            }
                        });
                        headerSvg.forEach((item, i) => {
                            if (i !== index) {
                                item.classList.remove('open');
                            }
                        });

                        // Toggle the clicked accordion
                        accordionWrapper[index].classList.toggle('open');
                        headerSvg[index].classList.toggle('open');
                    });
                });
            };

            this.RotateAppView()
            toggleAccordion()
        }
    }



    // ===========================================================================
    // Door Frame Selection

    handleDoorFrameSelection = () => {
        // fetch the list items in door and loop through
        // Listen for a click
        // Update selectedFrameForm Door api form


        if (this.sidebarModalContents && this.sidebarModalContents.firstElementChild &&
            this.sidebarModalContents.firstElementChild.classList.contains('door-frames')) {

            const doorFramesDesktop = document.querySelectorAll('.tools_sidebar-content .door-frames .door-frame')
            const doorFramesMobile = document.querySelectorAll('.mobile_tools-bar .door-frames .door-frame')


            doorFramesDesktop[this.currentDoorFrame].classList.add('active')
            doorFramesMobile[this.currentDoorFrame].classList.add('active')

            doorFramesDesktop.forEach((frame, index) => {
                frame.addEventListener('click', () => {
                    updateActiveState(index, doorFramesDesktop, doorFramesMobile)
                    this.currentDoorFrame = index;
                    this.selectedFrameForm = frames[index].form
                    console.log(this.selectedFrameForm)

                })
            })
            doorFramesMobile.forEach((frame, index) => {
                frame.addEventListener('click', () => {
                    updateActiveState(index, doorFramesDesktop, doorFramesMobile)
                    this.currentDoorFrame = index
                    this.selectedFrameForm = frames[index].form
                })
            })
        }


        const updateActiveState = (index, doorFramesDesktop, doorFramesMobile) => {
            doorFramesDesktop.forEach(frame => frame.classList.remove('active'))
            doorFramesMobile.forEach(frame => frame.classList.remove('active'))

            doorFramesDesktop[index].classList.add('active')
            doorFramesMobile[index].classList.add('active')
        }

    }



    handleHouseFrontSelection = () => {
        if (this.sidebarModalContents && this.sidebarModalContents.firstElementChild &&
            this.sidebarModalContents.firstElementChild.classList.contains('upload-house')) {

            const doorHouseFrontDesktop = document.querySelectorAll('.tools_sidebar-content .house-fronts .house-front')
            const doorHouseFrontMobile = document.querySelectorAll('.mobile_tools-bar .house-fronts .house-front')

            doorHouseFrontDesktop[this.currentHouseFront].classList.add('active')
            doorHouseFrontMobile[this.currentHouseFront].classList.add('active')

            doorHouseFrontDesktop.forEach((front, index) => {
                front.addEventListener('click', () => {
                    updateActiveState(index, doorHouseFrontDesktop, doorHouseFrontMobile)
                    this.currentHouseFront = index;
                    // alert('selected');
                })
            })
            doorHouseFrontMobile.forEach((front, index) => {
                front.addEventListener('click', () => {
                    updateActiveState(index, doorHouseFrontDesktop, doorHouseFrontMobile)
                    this.currentHouseFront = index

                })
            })
        }

        const updateActiveState = (index, doorHouseFrontDesktop, doorHouseFrontMobile) => {
            doorHouseFrontDesktop.forEach(front => front.classList.remove('active'))
            doorHouseFrontMobile.forEach(front => front.classList.remove('active'))

            doorHouseFrontDesktop[index].classList.add('active')
            doorHouseFrontMobile[index].classList.add('active')
        }
    }



}









let configuratorApp = new App()