import mtn from '../../../static/images/mtn.jpg';

export default function SignupStyle() {
    return (
        <style type="text/css">
        {
            `
                .profile-preview {
                    max-height: 120px;
                    border-radius: 20px;
                }
                .profile-preview:hover {
                    filter: brightness(0.7);
                    cursor: pointer;
                }
                .file-select {
                    color: #aaaaaa;
                }    
                .signup-cont {
                        padding-top: 100px;
                        color: #191919;
                        background-image: url(${mtn});
                        background-size: cover;
                        background-position: center top;
                        height: 100% !important;
                }
                .signup-col {
                    background-color: rgba(9, 9, 9, 0.7);
                    padding: 55px;
                    border-radius: 10px;
                    max-height: 100%;
                    max-width: 750px;
                }   
                .private-switch {
                    color: #aaaaaa;
                    background-color: transparent;
                    cursor: pointer;
                }
                .form-switch .form-check-input {
                    height: 30px;
                    width: 50px;
                    background-color: #404040;
                    cursor: pointer;

                }
                .form-switch .form-check-input:focus {
                    border-color: rgba(0, 0, 0, 0.9);
                    outline: 0;
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba(0,0,0,0.25)'/></svg>");
                }
                .form-switch .form-check-input:checked {
                    background-color: #404040;
                    border-color: #30D158;
                    border: none;
                    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba(255,255,255,1.0)'/></svg>");
                }
                .signup-input {
                    background-color: rgba(35, 35, 35, 0.7);
                    color: #aaaaaa;
                    border: none; 
                    box-shadow: none; 
                    outline: none;

                }
                .signup-input:hover,                                         
                .signup-input:focus, 
                .signup-input:active, 
                .signup-input:focus-visible {
                    background-color: #202020;
                    color: #aaaaaa;
                    border: none; 
                    box-shadow: none; 
                    outline: none;
                }
                .signup-title-row {
                    color: #34aaaa;
                    font-size: 4vh;
                    font-weight: 500;
                }
                .floating-label-color  {
                    color: #aaaaaa;
                }
                .private-profile-text {
                    color: #aaaaaa;
                    margin-right: 20px;
                    margin-top: 5px;
                }
                .addprofilepic-button {
                    padding: 15px; 
                    font-size: 16pt;
                    border-radius: 15px;
                    font-weight: 400;
                    max-height: 100px;
                }
                .signup-button-ctm {
                    font-size: 25pt;
                    font-weight: 700;
                    background-color: #191919;
                    border-radius: 15px;
                }
                .total-height {
                    height: max(100vh, 1000px);
                }
                .private-profile-info {
                    color: #404040;
                    cursor: pointer;
                }
                .drop-area {
                    background-color: #191919;
                    height: 300px;
                    width: 100%;
                    color: #aaaaaa;
                    border: dashed 1px #aaaaaa;
                    font-size: 24pt;
                }
                .navbar-signup-bottom {
                    background-color: transparent;
                    padding-bottom: 50px;
                }               
                .signup-error {
                    color: darkred; 
                    font-weight: 100; 
                    font-size: 16pt;
                    margin-top: 25px;
                }
            `
        }
        </style>

    )
}