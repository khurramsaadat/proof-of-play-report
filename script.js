document.addEventListener('DOMContentLoaded', function() {
    // Get current date in YYYY-MM-DD format
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    
    // Initialize form with default values and current date
    document.getElementById('refNo').value = 'PM1046-2025.01';
    document.getElementById('contactPerson').value = 'Noor Sumaiya';
    document.getElementById('date').value = formattedToday;

    // Add styles for better button hover effects
    const style = document.createElement('style');
    style.textContent = `
        .action-btn {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .action-btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .modern-btn:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
        }

        .transform-btn {
            transition: all 0.2s ease;
        }

        .transform-btn:hover {
            background-color: #e9ecef;
            transform: scale(1.1);
        }

        .accept-btn:hover {
            background-color: #28a745 !important;
            color: white !important;
        }

        .reupload-btn:hover {
            background-color: #17a2b8 !important;
            color: white !important;
        }

        .preview-container {
            margin-bottom: 20px;
        }

        @media print {
            .no-print {
                display: none !important;
            }
            
            .preview-container {
                break-inside: avoid;
                page-break-inside: avoid;
                margin: 20px 0;
            }

            /* Style location selects for print */
            .preview-location-select {
                border: none !important;
                background: none !important;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                pointer-events: none;
                font-size: 12pt;
                margin-bottom: 10px;
                color: black;
            }
        }
    `;
    document.head.appendChild(style);

    // Helper function to create a location item
    function createLocationItem(container, text, number) {
        const wrapper = document.createElement('div');
        wrapper.className = 'location-input-wrapper';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = text;
        input.className = 'location-input';
        input.title = 'Click to edit';
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-location-btn no-print';
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Remove location';
        
        removeBtn.addEventListener('click', function() {
            wrapper.remove();
            updateLocationNumbers();
        });
        
        wrapper.appendChild(input);
        wrapper.appendChild(removeBtn);
        
        return wrapper;
    }

    // Function to update location numbers
    function updateLocationNumbers() {
        const locationInputs = document.querySelectorAll('.location-input');
        locationInputs.forEach((input, index) => {
            const number = (index + 1).toString().padStart(2, '0');
            input.setAttribute('data-number', number);
        });
    }

    // Initialize location list with exact formatting
    const locations = [
        "DDF Concourse-A EAST_Z7 (SL)",
        "DDF Concourse-A WEST_Z2 (DI)",
        "DDF Concourse-B EAST_U13 (LED)",
        "DDF Concourse-B EAST_U13 (2no. of SL)",
        "DDF Concourse-B EAST_U13 (1no. of DI)",
        "DDF Concourse-B EAST_U13 (3no. of Tablets)",
        "DDF Concourse-B WEST_U3 (LED)",
        "DDF Concourse-B WEST_U3 (2no. of SL)",
        "DDF Concourse-B WEST_U3 (2no. of DI)",
        "DDF Concourse-B WEST_U3 (2no. of Tablets)",
        "DDF Concourse-B WEST POPUP (1no. of SL)*",
        "DDF Concourse-B WEST POPUP (3no. of Tablets)*",
        "DDF Concourse-C Tower (Shelf Display & DI)",
        "DDF Concourse-C Apron (Shelf Display & DI)",
        "DDF Terminal-2 Departures (Shelf Display & DI)",
        "DDF Concourse-D ZONE_5 (3x2P)"
    ];

    // Create a wrapper div for the location section
    const locationWrapper = document.createElement('div');
    locationWrapper.className = 'location-wrapper';

    // Create the location list
    const locationList = document.createElement('div');
    locationList.className = 'location-list';
    
    // Create location items
    locations.forEach((location) => {
        const item = createLocationItem(locationList, location);
        locationList.appendChild(item);
    });

    // Update initial location numbers
    updateLocationNumbers();

    // Add editable note with date picker
    const noteDiv = document.createElement('div');
    noteDiv.className = 'location-note';
    const noteWrapper = document.createElement('div');
    noteWrapper.className = 'note-wrapper';
    const asteriskSpan = document.createElement('span');
    asteriskSpan.textContent = '* Added on ';
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.className = 'note-date-input';
    dateInput.value = formattedToday;
    
    noteWrapper.appendChild(asteriskSpan);
    noteWrapper.appendChild(dateInput);
    noteDiv.appendChild(noteWrapper);
    locationList.appendChild(noteDiv);

    // Create and add the button container
    const actionContainer = document.createElement('div');
    actionContainer.className = 'location-actions';
    actionContainer.innerHTML = `
        <button type="button" class="add-location-btn">
            <span class="plus-icon">+</span> Add Location
        </button>
        <button type="button" class="commit-btn" style="display: none;">
            <span class="check-icon">✓</span> Commit Changes
        </button>
    `;

    // Add both elements to the wrapper
    locationWrapper.appendChild(locationList);
    locationWrapper.appendChild(actionContainer);

    // Replace the existing locationList with our new wrapper
    document.getElementById('locationList').replaceWith(locationWrapper);

    // Add click handler for the add button
    const addLocationBtn = actionContainer.querySelector('.add-location-btn');
    const commitBtn = actionContainer.querySelector('.commit-btn');
    let hasChanges = false;

    addLocationBtn.addEventListener('click', function() {
        const newItem = createLocationItem(locationList, "New Location");
        
        // Insert new item before the note
        const noteDiv = locationList.querySelector('.location-note');
        locationList.insertBefore(newItem, noteDiv);
        
        // Update location numbers
        updateLocationNumbers();
        
        // Show commit button
        commitBtn.style.display = 'inline-block';
        hasChanges = true;
    });

    // Add click handler for the commit button
    commitBtn.addEventListener('click', function() {
        if (hasChanges) {
            // Hide the commit button
            commitBtn.style.display = 'none';
            
            // Mark all current locations as selected
            document.querySelectorAll('.location-input-wrapper').forEach(wrapper => {
                wrapper.setAttribute('data-selected', 'true');
            });
            
            hasChanges = false;
            
            // Update preview dropdowns
            updateLocationDropdowns();
        }
    });

    // Function to update location dropdowns in preview containers
    function updateLocationDropdowns() {
        const locationInputs = document.querySelectorAll('.location-input');
        const dropdowns = document.querySelectorAll('.preview-location-select');
        
        dropdowns.forEach(dropdown => {
            const currentValue = dropdown.value;
            dropdown.innerHTML = '<option value="">-- Select Location --</option>';
            
            locationInputs.forEach((input, index) => {
                const number = (index + 1).toString().padStart(2, '0');
                const option = document.createElement('option');
                option.value = input.value;
                option.textContent = `${number}. ${input.value}`;
                if (input.value === currentValue) {
                    option.selected = true;
                }
                dropdown.appendChild(option);
            });
        });
    }

    // Handle image upload
    function handleImageUpload(input, previewElement) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const previewContainer = document.createElement('div');
                previewContainer.className = 'preview-container';
                
                // Create image first to check its dimensions
                const img = new Image();
                img.src = e.target.result;
                img.onload = function() {
                    const isLargeImage = img.width > 800 || img.height > 600;
                    previewContainer.classList.add(isLargeImage ? 'large-image' : 'small-image');
                    
                    // Create location dropdown
                    const locationSelect = document.createElement('select');
                    locationSelect.className = 'preview-location-select';
                    locationSelect.required = true;
                    
                    // Add default option
                    const defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.textContent = '-- Select Location --';
                    locationSelect.appendChild(defaultOption);
                    
                    // Add all locations to dropdown
                    const currentLocations = Array.from(document.querySelectorAll('.location-input')).map(input => input.value);
                    currentLocations.forEach((location, index) => {
                        const option = document.createElement('option');
                        option.value = location;
                        option.textContent = `${(index + 1).toString().padStart(2, '0')}. ${location}`;
                        locationSelect.appendChild(option);
                    });
                    
                    // Create image container
                    const imageContainer = document.createElement('div');
                    imageContainer.className = 'image-container';
                    
                    const displayImg = document.createElement('img');
                    displayImg.src = e.target.result;
                    displayImg.className = 'preview-image';
                    
                    // Create remove button with no-print class
                    const removeBtn = document.createElement('button');
                    removeBtn.type = 'button';
                    removeBtn.className = 'remove-image-btn no-print';
                    removeBtn.innerHTML = '×';
                    removeBtn.onclick = function() {
                        previewContainer.remove();
                    };
                    
                    previewContainer.appendChild(locationSelect);
                    imageContainer.appendChild(displayImg);
                    imageContainer.appendChild(removeBtn);
                    previewContainer.appendChild(imageContainer);
                    
                    // Append new container to preview area
                    previewElement.appendChild(previewContainer);
                };
                
                // Reset the file input
                input.value = '';
            };
            
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Update image upload button creation
    function createImageUploadSection() {
        const container = document.createElement('div');
        container.className = 'image-upload-section';
        
        const uploadBtn = document.createElement('button');
        uploadBtn.className = 'upload-btn modern-btn no-print';
        uploadBtn.type = 'button';
        uploadBtn.innerHTML = '<i class="fas fa-camera"></i> Upload Photos';
        
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.className = 'file-input';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        fileInput.multiple = true;
        
        const previewArea = document.createElement('div');
        previewArea.className = 'image-preview';
        previewArea.style.display = 'flex';
        previewArea.style.flexDirection = 'column';
        previewArea.style.gap = '15px';
        
        uploadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                Array.from(this.files).forEach(file => {
                    const newInput = document.createElement('input');
                    newInput.type = 'file';
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    newInput.files = dataTransfer.files;
                    handleImageUpload(newInput, previewArea);
                });
            }
        });
        
        container.appendChild(uploadBtn);
        container.appendChild(fileInput);
        container.appendChild(previewArea);
        
        return container;
    }

    // Add only one image upload section
    const proofCell = document.querySelector('.proof-cell');
    if (proofCell) {
        const uploadSection = createImageUploadSection();
        proofCell.innerHTML = ''; // Clear any existing content
        proofCell.appendChild(uploadSection);
    }

    // Save functionality
    window.saveReport = async function() {
        try {
            // Hide elements that shouldn't be in the PDF
            const elementsToHide = document.querySelectorAll('.no-print');
            elementsToHide.forEach(el => el.style.display = 'none');

            const element = document.querySelector('.container');
            const opt = {
                margin: [10, 10, 10, 10],
                filename: 'proof_of_play_report.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    logging: true,
                    allowTaint: true,
                    scrollY: -window.scrollY
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait',
                    compress: true
                }
            };

            await html2pdf().set(opt).from(element).save();

            // Show elements again after PDF generation
            elementsToHide.forEach(el => el.style.display = '');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please ensure all images are loaded and try again.');
        }
    };

    // Print functionality
    window.printReport = function() {
        window.print();
    };

    // Email functionality
    window.emailReport = async function() {
        try {
            const element = document.querySelector('.container');
            const opt = {
                margin: 1,
                filename: 'proof_of_play_report.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            const pdf = await html2pdf().set(opt).from(element).output('blob');
            const file = new File([pdf], 'proof_of_play_report.pdf', { type: 'application/pdf' });

            // Create email link
            const emailSubject = 'Proof of Play Report';
            const emailBody = 'Please find attached the Proof of Play Report.';
            
            // Save PDF for manual attachment
            const pdfUrl = URL.createObjectURL(file);
            const downloadLink = document.createElement('a');
            downloadLink.href = pdfUrl;
            downloadLink.download = 'proof_of_play_report.pdf';
            downloadLink.click();

            // Open email client
            window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            alert('Please attach the downloaded PDF to your email.');
        } catch (error) {
            console.error('Error:', error);
            alert('Error generating PDF. Please try again.');
        }
    };

    // Update the HTML structure for action buttons (add this to your script.js)
    const actionButtons = document.querySelector('.action-buttons');
    if (actionButtons) {
        const resetBtn = document.createElement('button');
        resetBtn.className = 'action-btn reset-btn';
        resetBtn.textContent = 'Reset';
        resetBtn.onclick = resetForm;
        actionButtons.appendChild(resetBtn);
    }

    // Add reset functionality
    function resetForm() {
        if (confirm('Are you sure you want to reset all changes?')) {
            // Reset form values to defaults
            document.getElementById('refNo').value = 'PM1046-2025.01';
            document.getElementById('contactPerson').value = 'Noor Sumaiya';
            document.getElementById('date').value = formattedToday;
            
            // Clear all image previews
            const previews = document.querySelectorAll('.image-preview');
            previews.forEach(preview => preview.innerHTML = '');
            
            // Reset signature box
            const signatureBox = document.querySelector('#signatureBox');
            if (signatureBox) {
                // Remove existing content
                signatureBox.innerHTML = `
                    <input type="file" accept="image/png" class="signature-input" id="signatureInput" style="opacity: 0; position: absolute; width: 100%; height: 100%; cursor: pointer;">
                    <div class="signature-placeholder" style="font-size: 0.8em; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;">Drag & Drop</div>
                `;
                
                // Reattach event listeners
                const signatureInput = signatureBox.querySelector('#signatureInput');
                
                ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                    signatureBox.addEventListener(eventName, preventDefaults, false);
                });

                ['dragenter', 'dragover'].forEach(eventName => {
                    signatureBox.addEventListener(eventName, () => {
                        signatureBox.classList.add('highlight');
                    });
                });

                ['dragleave', 'drop'].forEach(eventName => {
                    signatureBox.addEventListener(eventName, () => {
                        signatureBox.classList.remove('highlight');
                    });
                });

                signatureBox.addEventListener('drop', handleSignatureDrop);
                signatureInput.addEventListener('change', handleSignatureSelect);
            }
            
            // Reset location list to original state
            const locationList = document.querySelector('.location-list');
            if (locationList) {
                locationList.innerHTML = '';
                locations.forEach((location, index) => {
                    const item = createLocationItem(locationList, location, index + 1);
                    locationList.appendChild(item);
                });
                
                // Re-add the note
                const noteDiv = document.createElement('div');
                noteDiv.className = 'location-note';
                const noteWrapper = document.createElement('div');
                noteWrapper.className = 'note-wrapper';
                const asteriskSpan = document.createElement('span');
                asteriskSpan.textContent = '* Added on ';
                const dateInput = document.createElement('input');
                dateInput.type = 'date';
                dateInput.className = 'note-date-input';
                dateInput.value = formattedToday;
                noteWrapper.appendChild(asteriskSpan);
                noteWrapper.appendChild(dateInput);
                noteDiv.appendChild(noteWrapper);
                locationList.appendChild(noteDiv);
            }

            // Reset Add Location button
            const addButtonDiv = document.querySelector('.location-actions');
            if (addButtonDiv) {
                addButtonDiv.style.display = 'block';
                const addLocationBtn = addButtonDiv.querySelector('.add-location-btn');
                const commitLocationBtn = addButtonDiv.querySelector('.commit-btn');
                if (addLocationBtn) addLocationBtn.style.display = 'inline-block';
                if (commitLocationBtn) commitLocationBtn.style.display = 'none';
            }
        }
    }

    // Add Service Engineer section
    function createServiceEngineerSection() {
        const section = document.createElement('div');
        section.className = 'service-engineer-section';
        
        section.innerHTML = `
            <h3>Service Engineer:</h3>
            <div class="engineer-details">
                <div class="detail-row">
                    <label>Name:</label>
                    <span>Hazem Shbair</span>
                </div>
                <div class="detail-row signature-row">
                    <label>Sign:</label>
                    <div class="signature-box" id="signatureBox">
                        <input type="file" accept="image/png" class="signature-input" id="signatureInput" style="opacity: 0; position: absolute; width: 100%; height: 100%; cursor: pointer;">
                        <div class="signature-placeholder no-print" style="font-size: 0.8em; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;">Drag & Drop</div>
                    </div>
                </div>
                <div class="detail-row">
                    <label>Date:</label>
                    <input type="date" class="engineer-date-input" value="${formattedToday}">
                </div>
            </div>
            <div class="action-buttons">
                <button class="action-btn print-btn" onclick="printReport()">Print</button>
                <button class="action-btn email-btn" onclick="emailReport()">Email</button>
            </div>
        `;

        // Add drag and drop functionality for signature
        const signatureBox = section.querySelector('#signatureBox');
        const signatureInput = section.querySelector('#signatureInput');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            signatureBox.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            signatureBox.addEventListener(eventName, () => {
                signatureBox.classList.add('highlight');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            signatureBox.addEventListener(eventName, () => {
                signatureBox.classList.remove('highlight');
            });
        });

        signatureBox.addEventListener('drop', handleSignatureDrop);
        signatureInput.addEventListener('change', handleSignatureSelect);

        function handleSignatureDrop(e) {
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'image/png') {
                handleSignatureFile(file);
            }
        }

        function handleSignatureSelect(e) {
            const file = this.files[0];
            if (file) {
                handleSignatureFile(file);
            }
        }

        function handleSignatureFile(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const container = document.createElement('div');
                container.className = 'signature-image-container';

                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'signature-image';

                // Update the transform controls HTML
                const controls = document.createElement('div');
                controls.className = 'transform-controls';
                controls.innerHTML = `
                    <div class="transform-controls-group">
                        <button class="transform-btn" data-action="move-up" title="Move Up">↑</button>
                        <div class="transform-controls-row">
                            <button class="transform-btn" data-action="move-left" title="Move Left">←</button>
                            <button class="transform-btn" data-action="move-right" title="Move Right">→</button>
                        </div>
                        <button class="transform-btn" data-action="move-down" title="Move Down">↓</button>
                    </div>
                    <div class="transform-controls-group">
                        <button class="transform-btn" data-action="rotate-left" title="Rotate Left">↺</button>
                        <button class="transform-btn" data-action="rotate-right" title="Rotate Right">↻</button>
                        <button class="transform-btn" data-action="scale-up" title="Scale Up">+</button>
                        <button class="transform-btn" data-action="scale-down" title="Scale Down">-</button>
                    </div>
                    <button class="transform-btn reupload-btn" data-action="reupload" title="Reupload Signature">↻</button>
                    <button class="transform-btn accept-btn" data-action="accept" title="Accept Signature">✓</button>
                `;

                // Initialize transform values
                let rotation = 0;
                let scale = 1;
                let offsetX = 0;
                let offsetY = 0;
                let isDragging = false;
                let startX, startY;

                // Update transform
                function updateTransform() {
                    img.style.transform = `rotate(${rotation}deg) scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
                }

                // Add event listeners for controls
                controls.addEventListener('click', (e) => {
                    const button = e.target.closest('.transform-btn');
                    if (!button) return;

                    const action = button.dataset.action;
                    const moveStep = 10; // pixels to move per click

                    switch (action) {
                        case 'rotate-left':
                            rotation -= 5;
                            break;
                        case 'rotate-right':
                            rotation += 5;
                            break;
                        case 'scale-up':
                            scale = Math.min(scale + 0.1, 2);
                            break;
                        case 'scale-down':
                            scale = Math.max(scale - 0.1, 0.5);
                            break;
                        case 'move-up':
                            offsetY -= moveStep;
                            break;
                        case 'move-down':
                            offsetY += moveStep;
                            break;
                        case 'move-left':
                            offsetX -= moveStep;
                            break;
                        case 'move-right':
                            offsetX += moveStep;
                            break;
                        case 'reupload':
                            // Trigger file input click
                            signatureInput.click();
                            break;
                        case 'accept':
                            // Remove the controls and make the signature permanent
                            controls.remove();
                            img.style.cursor = 'default';
                            img.removeAttribute('tabindex');
                            
                            // Store the event listener functions
                            const mousedownHandler = (e) => {
                                isDragging = true;
                                startX = e.clientX - offsetX;
                                startY = e.clientY - offsetY;
                                img.style.cursor = 'grabbing';
                            };
                            
                            const mousemoveHandler = (e) => {
                                if (!isDragging) return;
                                offsetX = e.clientX - startX;
                                offsetY = e.clientY - startY;
                                updateTransform();
                            };
                            
                            const mouseupHandler = () => {
                                isDragging = false;
                                img.style.cursor = 'move';
                            };
                            
                            const dblclickHandler = () => {
                                rotation = 0;
                                scale = 1;
                                offsetX = 0;
                                offsetY = 0;
                                updateTransform();
                            };
                            
                            // Remove all event listeners
                            img.removeEventListener('mousedown', mousedownHandler);
                            document.removeEventListener('mousemove', mousemoveHandler);
                            document.removeEventListener('mouseup', mouseupHandler);
                            img.removeEventListener('dblclick', dblclickHandler);
                            
                            // Remove keyboard controls
                            document.removeEventListener('keydown', keydownHandler);
                            break;
                    }
                    updateTransform();
                });

                // Add keyboard controls for more precise movements
                const keydownHandler = (e) => {
                    if (!isDragging && img === document.activeElement) {
                        const moveStep = e.shiftKey ? 1 : 10; // Smaller step with Shift key
                        switch (e.key) {
                            case 'ArrowUp':
                                offsetY -= moveStep;
                                break;
                            case 'ArrowDown':
                                offsetY += moveStep;
                                break;
                            case 'ArrowLeft':
                                offsetX -= moveStep;
                                break;
                            case 'ArrowRight':
                                offsetX += moveStep;
                                break;
                        }
                        updateTransform();
                        e.preventDefault();
                    }
                };
                document.addEventListener('keydown', keydownHandler);

                // Make the image focusable for keyboard controls
                img.tabIndex = 0;

                // Add drag functionality
                img.addEventListener('mousedown', (e) => {
                    isDragging = true;
                    startX = e.clientX - offsetX;
                    startY = e.clientY - offsetY;
                    img.style.cursor = 'grabbing';
                });

                document.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    offsetX = e.clientX - startX;
                    offsetY = e.clientY - startY;
                    updateTransform();
                });

                document.addEventListener('mouseup', () => {
                    isDragging = false;
                    img.style.cursor = 'move';
                });

                // Reset transform on double click
                img.addEventListener('dblclick', () => {
                    rotation = 0;
                    scale = 1;
                    offsetX = 0;
                    offsetY = 0;
                    updateTransform();
                });

                container.appendChild(img);
                container.appendChild(controls);
                signatureBox.innerHTML = '';
                signatureBox.appendChild(container);
            };
            reader.readAsDataURL(file);
        }

        // Add date input formatting
        const dateInput = section.querySelector('.engineer-date-input');
        dateInput.addEventListener('change', function() {
            const date = new Date(this.value);
            const formattedDate = date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            this.setAttribute('data-formatted', formattedDate);
        });

        return section;
    }

    // Remove the old action buttons if they exist
    const oldActionButtons = document.querySelector('.action-buttons:not(.service-engineer-section .action-buttons)');
    if (oldActionButtons) {
        oldActionButtons.remove();
    }

    // Add the section before the footer
    const footer = document.querySelector('footer');
    const serviceEngineerSection = createServiceEngineerSection();
    document.querySelector('.container').insertBefore(serviceEngineerSection, footer);
});
