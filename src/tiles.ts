import { html } from 'lit';

export function pvIcon(state) {
    return html`
        <svg id="Livello_1" xmlns="http://www.w3.org/2000/svg"  version="1.1" viewBox="0 0 200 200">
          <defs>
            <style>
              .st0 {
                fill: #465e5e;
              }

              .st1 {
                fill: #fffeff;
              }

              .st3 {
                fill: #5e7574;
              }

              .st4 {
                fill: #4d636c;
              }

              .st5 {
                fill: #7b908e;
              }

              .st6 {
                fill: #b1bfbe;
              }

              .st7 {
                fill: #91a3a2;
              }
            </style>
          </defs>
          <g id="Oggetto_generativo">
            <g>
            <foreignObject id="foreign" class="st1" x="25" y="158" width="152" height="34">
                <div xmlns="http://www.w3.org/1999/xhtml" 
                  style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  font-size: 34px;
                  text-align: center;
                  ">
              <!-- Inserisci qui il contenuto che desideri -->
              <p>${state}w</p>
            </div>
          </foreignObject>
              <g>
                <polygon class="st1" points="33.01 96.79 166.88 96.79 167 104.87 108.14 105.22 108.02 118.91 123.58 119.03 123.58 130.96 76.31 130.96 76.31 119.03 91.87 118.91 91.75 105.22 33.24 105.22 33.01 96.79"/>
                <path class="st4" d="M166.53,93.52c.02.43.58,2.25.12,2.57H33.01c-1.27-4.06,4.46-1.53,6.67-2.57h126.85Z"/>
                <g>
                  <path class="st1" d="M166.53,93.52H33.48l-.35-.59,12.29-52.31h109.06l12.29,52.07c.06.52-.24.64-.23.82Z"/>
                  <polygon class="st5" points="136.22 78.77 158.93 78.77 161.85 90.82 138.1 91.17 136.22 78.77"/>
                  <polygon class="st5" points="100.41 78.77 122.41 78.77 123.7 91.06 100.41 91.17 100.41 78.77"/>
                  <polygon class="st0" points="41.2 78.77 63.2 78.77 61.91 90.82 38.39 91.17 41.2 78.77"/>
                  <polygon class="st3" points="77.01 78.77 98.54 79 98.66 91.06 75.84 91.17 77.01 78.77"/>
                  <polygon class="st7" points="134.12 65.9 156.12 65.9 158.81 77.48 135.99 77.83 134.12 65.9"/>
                  <polygon class="st5" points="99.95 65.9 121.24 65.9 122.53 77.48 100.18 77.83 99.95 65.9"/>
                  <polygon class="st5" points="77.71 65.9 98.54 65.9 98.66 77.72 76.78 77.6 77.71 65.9"/>
                  <polygon class="st0" points="43.54 65.9 64.84 65.9 63.55 77.48 41.2 77.6 43.54 65.9"/>
                  <polygon class="st7" points="132.48 53.96 153.54 53.96 156 64.61 133.88 64.73 132.48 53.96"/>
                  <polygon class="st7" points="100.18 53.96 120.07 53.96 121.36 64.61 99.95 64.73 100.18 53.96"/>
                  <polygon class="st3" points="46.12 53.96 66.48 54.2 65.19 64.61 44.01 64.73 46.12 53.96"/>
                  <polygon class="st5" points="78.65 53.96 98.54 53.96 98.66 64.61 77.71 64.73 78.65 53.96"/>
                  <polygon class="st6" points="130.84 42.73 151.44 42.73 153.43 52.91 132.24 53.03 130.84 42.73"/>
                  <polygon class="st7" points="100.41 42.73 119.14 42.73 120.19 52.91 99.95 53.03 99.83 43.08 100.41 42.73"/>
                  <path class="st5" d="M88.48,42.73c1.28-.04,10.19-.15,10.41.35l-.35,9.95-20.01-.12.7-9.83c3.08-.03,6.18-.26,9.24-.35Z"/>
                  <path class="st3" d="M67.18,42.73c.2.02.47-.09.59.12l-1.29,10.18-20.24-.35,1.99-9.71,18.96-.23Z"/>
                  <polygon class="st5" points="124.05 78.77 134.7 79.12 136.22 91.17 125.11 91.06 124.05 78.77"/>
                  <polygon class="st3" points="64.84 78.77 75.25 79.12 73.97 91.17 63.32 91.06 64.84 78.77"/>
                  <polygon class="st7" points="122.65 65.9 132.83 66.02 134.35 77.83 123.7 77.48 122.65 65.9"/>
                  <polygon class="st3" points="66.24 65.9 76.42 66.02 75.14 77.83 64.96 77.72 66.24 65.9"/>
                  <polygon class="st5" points="67.88 53.96 77.36 54.31 76.31 64.73 66.36 64.61 67.88 53.96"/>
                  <polygon class="st7" points="121.71 53.96 130.84 53.96 132.6 64.61 122.65 64.73 121.71 53.96"/>
                  <polygon class="st5" points="69.29 42.73 78.3 43.08 77.24 53.03 67.77 52.67 69.29 42.73"/>
                  <path class="st6" d="M120.78,42.73l8.78.12,1.05,10.18-9.24-.12c-.09-1.37-1.42-9.79-.59-10.18Z"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
    `;
  }


  


  export function battery(state, batteryPercentageState) {
    return html`
<svg id="Battery" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
  <defs>
    <style>
      .battBackground {
        fill: ${batteryPercentageState > 23 ? '#009245' : 'red'};
        ${state < 0  ? 'animation: slide-in-out 2s infinite;' : ' '}
    </style>
    <linearGradient id="Sfumatura_icon" data-name="Sfumatura icon" x1="5.79" y1="-680" x2="5.79" y2="-560" gradientTransform="translate(-520 80) rotate(90)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#e7dfdc"/>
      <stop offset="1" stop-color="#b8b9ba"/>
    </linearGradient>
  </defs>
  <text class="white font43" transform="translate(51.09 175.53)"><tspan x="0" y="0">${state}w</tspan></text>
  <rect id="back_x5F_battery" class="battBackground" x="65" y="50" width="60" height="${batteryPercentageState}" transform="translate(-5 195) rotate(-90)"/>
  <path id="battery" class="battColor" d="M150,129v-14h5.52c2.47,0,4.48-2.01,4.48-4.48v-21.04c0-2.47-2.01-4.48-4.48-4.48h-5.52v-14c0-3.31-2.69-6-6-6H46c-3.31,0-6,2.69-6,6v58c0,3.31,2.69,6,6,6h98c3.31,0,6-2.69,6-6ZM49,130c-2.21,0-4-1.79-4-4v-52c0-2.21,1.79-4,4-4h17v60h-17ZM69,130v-60h24v60h-24ZM96,130v-60h24v60h-24ZM123,130v-60h18c2.21,0,4,1.79,4,4v52c0,2.21-1.79,4-4,4h-18Z"/>
  <text id="percentage" class="white font36" transform="translate(67.28 52)"><tspan x="0" y="0">${batteryPercentageState}%</tspan></text>
  </svg>
     `;
  }

  export function gridPower(gridPower) {
    return html`
        <svg id="grid" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200">
          
          <g id="traliccio" class="opcity76">
            <path class="gridIconColor" d="M76.91,77.4s0,.03,0,.05c0,.16-.03.31-.09.44h13.01v-.49h-12.92Z"/>
            <path class="gridIconColor" d="M122.86,77.45s0-.03,0-.05h-12.53v.49h12.62c-.06-.14-.09-.28-.09-.44"/>
            <path class="gridIconColor" d="M145.85,74.14s-.03-.01-.04-.01l-14.43,2.54c.13.12.22.28.28.45l14.17-2.49s.04-.02.04-.05v-.4s0-.03-.02-.04"/>
            <path class="gridIconColor" d="M68.43,76.63l-14.24-2.51s-.03,0-.04.01c-.01,0-.02.02-.02.04v.4s.02.04.04.05l13.95,2.46c.06-.17.17-.32.3-.44"/>
            <path class="gridIconColor" d="M68.06,79.41s0-.03,0-.05h-13.88s-.05.02-.05.05v.39s.02.05.05.05h13.97c-.06-.13-.09-.28-.09-.44"/>
            <path class="gridIconColor" d="M76.91,79.36s0,.03,0,.05c0,.16-.03.31-.09.44h13.01v-.49h-12.92Z"/>
            <path class="gridIconColor" d="M122.86,79.41s0-.03,0-.05h-12.53v.49h12.62c-.06-.13-.09-.28-.09-.44"/>
            <path class="gridIconColor" d="M145.81,79.36h-14.11s0,.03,0,.05c0,.16-.03.31-.09.44h14.2s.05-.02.05-.05v-.39s-.02-.05-.05-.05"/>
            <path class="gridIconColor" d="M126.99,68.6v2.31c0,.16.13.29.29.29s.29-.13.29-.29v-2.31h-.59Z"/>
            <path class="gridIconColor" d="M131.02,75.49c0-.23-.19-.4-.42-.42-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.49-.38-.68-1.09-.72-1.5-.04-.39-.32-.72-.72-.72s-.7.32-.72.72c-.02.41-.09,1.04-.7,1.5-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h6.63c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42"/>
            <path class="gridIconColor" d="M72.19,68.58v2.33c0,.16.13.29.29.29s.29-.13.29-.29v-2.33h-.59Z"/>
            <path class="gridIconColor" d="M76.22,75.49c0-.23-.19-.4-.42-.42-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.49-.38-.68-1.09-.72-1.5-.04-.39-.32-.72-.72-.72s-.7.32-.72.72c-.02.41-.09,1.04-.7,1.5-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h6.63c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42"/>
            <path class="gridIconColor" d="M131.18,66.22l-21.88-11.48c-.1-.08-.23-.14-.36-.17l-8.41-20.68c-.07-.18-.25-.31-.45-.31s-.38.12-.45.31l-8.41,20.68s0,0,0,0c-.05.01-.1.03-.14.04-.01,0-.02.01-.04.02-.02,0-.03.01-.05.02l-22.06,11.57c-.36.19-.54.6-.45.99.1.39.45.67.86.67h21.18v22.14l-13.87,46.85c-.11.37.04.78.36.99.15.09.31.14.48.14.2,0,.41-.07.57-.21l13.08-11.18h17.87l13.08,11.18c.16.14.37.21.57.21.17,0,.33-.05.48-.14.33-.21.48-.61.36-.99l-9.12-30.82-4.74-16.02v-22.12h21.18c.49,0,.88-.39.88-.88,0-.36-.22-.67-.53-.81M118.08,66.14l-2.24-5.99,5.67,2.97-3.37,3.01h-.06ZM111.73,126.61h6.73l-2.35,3.74-4.38-3.74ZM82.02,66.12l-3.37-3.01,5.67-2.97-2.24,5.99h-.06ZM85.57,59.6l4.61,6.53h-7.05l2.45-6.53ZM94.47,49.17l11.27,5.38h-13.45l2.19-5.38ZM97.91,40.72l5.19,3.26-7.98,3.58,2.78-6.85ZM107.84,54.47l-12.47-5.95,8.5-3.82,3.97,9.76ZM107.88,65.83l-6.92-4.61,6.92-4.61v9.22ZM106.56,66.12h-12.96l6.48-4.32,6.48,4.32ZM106.56,56.31l-6.48,4.32-6.48-4.32h12.96ZM99.2,61.22l-6.92,4.61v-9.22l6.92,4.61ZM106.56,67.88l-6.48,4.32-6.48-4.32h12.96ZM99.2,72.79l-6.92,4.61v-9.22l6.92,4.61ZM93.44,91.03h13.29l-6.64,4.84-6.64-4.84ZM99.25,96.48l-11.23,8.19,3.99-13.47,7.24,5.28ZM100.08,97.08l11.43,8.34h-22.87l11.43-8.34ZM100.91,96.48l7.24-5.28,3.99,13.47-11.23-8.19ZM111.15,107.18l-11.07,9.46-11.07-9.46h22.14ZM93.6,89.27l6.48-4.32,6.48,4.32h-12.96ZM92.28,88.97v-9.22l6.92,4.61-6.92,4.61ZM87.08,107.85l11.07,9.46h-13.87l2.8-9.46ZM113.08,107.85l2.8,9.46h-13.87l11.07-9.46ZM100.96,84.36l6.92-4.61v9.22l-6.92-4.61ZM100.08,83.77l-7.8-5.2,7.8-5.2,7.8,5.2-7.8,5.2ZM83.73,119.15l5.56,6.47h-7.48l1.92-6.47ZM81.22,127.65l2.1,3.33-.51.43h-2.71l1.11-3.77ZM84.06,130.34l-2.35-3.74h6.72l-4.37,3.74ZM84.28,118.29h13.88l-8,6.84-5.88-6.84ZM115.89,118.29l-5.89,6.85-8.01-6.85h13.89ZM117.35,131.42l-.5-.43,2.09-3.33,1.11,3.75h-2.71ZM110.88,125.63l5.55-6.46,1.91,6.46h-7.47ZM100.96,72.79l6.92-4.61v9.22l-6.92-4.61ZM114.59,59.62l2.45,6.53h-7.05l4.61-6.53ZM109.64,64.93v-8.02l4.13,2.17-4.13,5.85ZM100.08,35.37l3.03,7.46-4.83-3.04,1.8-4.42ZM90.52,64.91l-4.13-5.85,4.13-2.17v8.02ZM77.73,63.59l2.82,2.53h-7.64l4.82-2.53ZM92.29,125.63l7.79-6.66,7.79,6.66h-15.58ZM119.6,66.14l2.82-2.53,4.82,2.53h-7.64Z"/>
          </g>
          <foreignObject id="foreign" class="st1" x="25" y="158" width="152" height="34">
                <div xmlns="http://www.w3.org/1999/xhtml" 
                  style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  font-size: 34px;
                  text-align: center;
                  ">
              <!-- Inserisci qui il contenuto che desideri -->
              <p>${gridPower}w</p>
            </div>
          </foreignObject>
        </svg>
       `;
  }

//   export function home_no_meter(totalPower) {

//     return html`
//     <svg id="home" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
//       <defs>
//         <linearGradient id="home_gradient_1" data-name="Sfumatura senza nome 137" x1="61.53" y1="91.73" x2="140.14" y2="106.85" gradientUnits="userSpaceOnUse">
//           <stop offset="0" stop-color="#dedfdf"/>
//           <stop offset="1" stop-color="#9ca09f"/>
//         </linearGradient>
//         <linearGradient id="home_gradient_2" data-name="Sfumatura senza nome 138" x1="52.04" y1="60.27" x2="148.68" y2="67.3" gradientUnits="userSpaceOnUse">
//           <stop offset="0" stop-color="#ececec"/>
//           <stop offset="1" stop-color="#9da09f"/>
//         </linearGradient>
//       </defs>
//       <text class="white font43" transform="translate(43.07 176.31)"><tspan x="0" y="0">${totalPower}w</tspan></text>
//       <polygon class="home_st2" points="99.54 59.67 138.62 85.48 138.3 131.29 112.08 130.98 111.97 90.43 87.43 90.74 87.33 131.29 60.89 130.98 60.89 85.27 99.54 59.67"/>
//       <polygon class="home_st0" points="99.54 40.29 152.1 76.21 144.62 83.9 99.75 53.35 54.67 83.9 47.2 76.21 99.54 40.29"/>
//     </svg>
//            `;
//   }

  export function home(totalPower, pvPercentage, batteryPercentage) {

    return html`
    <svg id="home" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
      <defs>
        <style>
          .home_meter_st0 {
            fill: #606060;
          }

          .home_meter_st0, .home_meter_st1 {
            opacity: .56;
            stroke: #4d4d4d;
            stroke-miterlimit: 10;
          }

          .home_meter_st1 {
            fill: url(#Sfumatura_senza_nome_28);
          }

          .home_meter_st2 {
            fill: none;
          }

          .home_meter_st3 {
            fill: url(#Sfumatura_senza_nome_138);
          }

          .home_meter_st4 {
            fill: url(#sfumatura_traliccio);
          }

          .home_meter_st5 {
            fill: url(#Sfumatura_senza_nome_137);
          }
        </style>
        <linearGradient id="sfumatura_traliccio" data-name="sfumatura traliccio" x1="150.45" y1="-8.54" x2="49.91" y2="207.72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#959c98"/>
          <stop offset="1" stop-color="#254344"/>
        </linearGradient>
        <linearGradient id="Sfumatura_senza_nome_137" data-name="Sfumatura senza nome 137" x1="61.88" y1="105.94" x2="140.49" y2="121.06" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#dedfdf"/>
          <stop offset="1" stop-color="#9ca09f"/>
        </linearGradient>
        <linearGradient id="Sfumatura_senza_nome_138" data-name="Sfumatura senza nome 138" x1="52.39" y1="74.48" x2="149.03" y2="81.51" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ececec"/>
          <stop offset="1" stop-color="#9da09f"/>
        </linearGradient>
        <linearGradient id="Sfumatura_senza_nome_28" data-name="Sfumatura senza nome 28" x1="26.16" y1="27" x2="174.16" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#51d400"/>
              <stop offset=".${pvPercentage}" stop-color="#51d400"/>
              <stop offset=".${pvPercentage}" stop-color="#ff9115"/>
              <stop offset=".${pvPercentage + batteryPercentage}" stop-color="#ff9115"/>
              <stop offset=".${pvPercentage + batteryPercentage}" stop-color="#2ac0ff"/>
        </linearGradient>
      </defs>
      <g id="casa">
        <g>
          <path class="home_meter_st4" d="M171.56.08H28.56C13.81,2.08,2.45,13.54.36,28.28c-.01,4.9-.03,9.81-.05,14.72C.23,61.85.07,80.71,0,99.57v2.49c-.05,24.04.09,48.07.82,72.03,2.78,12.03,11.78,21.52,23.75,24.69,49.82,1.71,100.17,1.25,150.03.24,14.23-3.22,24.46-15.5,25.39-30.08V30.62c-1-15.6-12.85-28.64-28.44-30.54Z"/>
          <path class="home_meter_st0" d="M164.07,11.04c-.22-.03-.44-.04-.66-.04H36.73c-.24,0-.49.02-.73.05-12.84,1.9-22.72,11.87-24.7,24.7-.04.25-.05.5-.05.74,0,.63,0,1.26,0,1.9,0,2.54,2.06,4.61,4.6,4.61h168.62c2.54,0,4.6-2.06,4.6-4.6h0c0-.13,0-.26-.01-.4-.97-13.69-11.33-25.14-24.99-26.96Z"/>
          <g>
            <polygon class="home_meter_st5" points="99.89 73.88 138.97 99.68 138.65 145.5 112.43 145.18 112.32 104.63 87.78 104.95 87.68 145.5 61.24 145.18 61.24 99.47 99.89 73.88"/>
            <polygon class="home_meter_st3" points="99.89 54.5 152.45 90.42 144.97 98.1 100.11 67.56 55.03 98.1 47.55 90.42 99.89 54.5"/>
          </g>
        </g>
      </g>
      <foreignObject id="foreign" class="st1" x="25" y="158" width="152" height="34">
                <div xmlns="http://www.w3.org/1999/xhtml" 
                  style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  font-size: 34px;
                  text-align: center;
                  ">
                  <!-- Inserisci qui il contenuto che desideri -->
                  <p>${totalPower}w</p>
                </div>
              </foreignObject>
      <rect class="home_meter_st1" x="26.16" y="14.5" width="148" height="25" rx="10" ry="10"/>
    </svg>
           `;
  }



export function inverter() {
  return html`

<svg id="home" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200">
  <path class="inverter_st1" d="M76.67,174.39h-29.16c-4.3,0-7.78-5.55-7.78-12.42V37.79c0-6.87,3.47-12.42,7.78-12.42h104.97c4.3,0,7.78,5.55,7.78,12.42v124.18c0,6.87-3.47,12.42-7.78,12.42h-75.81Z"/>
  <path id="displaybottom" class="inverter_st3" d="M61.12,100.52h81.65c2.15,0,3.89,1.74,3.89,3.89v31.1c0,2.15-1.74,3.89-3.89,3.89H57.23c-2.15,0-3.89-1.74-3.89-3.89v-31.1c0-2.15,1.74-3.89,3.89-3.89h3.89Z"/>
  <text class="inverter_st4" transform="translate(66.24 129.77)"><tspan x="0" y="0">220v</tspan></text>
  <path id="displayup" class="inverter_st3" d="M60.78,47.16h81.65c2.15,0,3.89,1.74,3.89,3.89v31.1c0,2.15-1.74,3.89-3.89,3.89H56.89c-2.15,0-3.89-1.74-3.89-3.89v-31.1c0-2.15,1.74-3.89,3.89-3.89h3.89Z"/>
  <text class="inverter_st4" transform="translate(74.81 76.41)"><tspan x="0" y="0">12v</tspan></text>
  <g id="led">
    <circle class="inverter_st0" cx="126.4" cy="36.51" r="3.34"/>
    <circle class="inverter_st0" cx="99.66" cy="36.51" r="3.34"/>
    <circle class="inverter_st0" cx="72.92" cy="36.51" r="3.34"/>
  </g>
  <line class="inverter_st2" x1="72.78" y1="153.01" x2="88.34" y2="153.01"/>
  <line class="inverter_st2" x1="72.78" y1="160.78" x2="88.34" y2="160.78"/>
  <line class="inverter_st2" x1="100" y1="149.12" x2="100" y2="164.67"/>
  <path class="inverter_st2" d="M127.22,156.9c0,2.14-1.75,3.89-3.89,3.89s-3.89-1.75-3.89-3.89-1.75-3.89-3.89-3.89-3.89,1.75-3.89,3.89"/>
  <path class="inverter_st2" d="M76.67,174.39v7.78c0,3.23,2.6,5.83,5.83,5.83h3.89c3.23,0,5.83-2.6,5.83-5.83v-7.78"/>
  <path class="inverter_st2" d="M107.78,174.39v7.78c0,3.23,2.6,5.83,5.83,5.83h3.89c3.23,0,5.83-2.6,5.83-5.83v-7.78"/>
  <path class="inverter_st2" d="M123.33,25.61v-7.78c0-3.23-2.6-5.83-5.83-5.83h-3.89c-3.23,0-5.83,2.6-5.83,5.83v7.78"/>
  <path class="inverter_st2" d="M92.22,25.61v-7.78c0-3.23-2.6-5.83-5.83-5.83h-3.89c-3.23,0-5.83,2.6-5.83,5.83v7.78"/>
</svg>
`;
}