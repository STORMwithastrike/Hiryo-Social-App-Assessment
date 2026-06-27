# Hiryo Social App
A VHDL-based Smart Parking System that uses a DE10-Lite FPGA to manage an 8-spot parking lot. It uses two KY-032 IR sensors for vehicle detection and an SG-90 servo motor for gate movement. Features include a 7-segment display counter and a switch to toggle between manual and autonomous entry modes (CSEN 605: Digital System Design Course Project).

<p align="center">
  <img src="docs/screenshots/Home_Page.webp" width="30%" />
  <img src="docs/screenshots/Post_With_Comments.webp" width="30%" />
  <img src="docs/screenshots/Post_Without_Comments.webp" width="30%" />
</p>

## 💡Project Idea
The idea of this project is to create a smart parking system. Initially, The number of empty spots is 8 and it works in 2 modes. The autonomous mode makes use of 2 sensors such that when the first sensor detects a car, the gate opens using a servo motor. The second sensor detects when a car has passed the gate. When it detects the presence of the car, the number of empty spots decrement by 1. The manual mode works by pressing a button which opens and closes the gate. When it closes the gate, it decrements the number of empty spots by 1. There’s also a reset button that when pressed, returns the counter to 8 in any mode. The logic for the program is done entirely in VHDL.

## 🔧Parts Used
* 2x **KY-032 Infrared Sensors**
* 1x **SG-90 Servo Motor**
* 1x **DE10-Lite FPGA**
* 1x **Breadboard**
* xx **Male-to-Female Wires**
* xx **Female-to-Male Wires**
