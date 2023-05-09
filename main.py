backward = 0
right = 0
left_motor = 0
right_motor = 0
radio.set_group(89)
basic.show_icon(IconNames.DIAMOND)

def on_forever():
    
    def on_received_value(name, value):
        global backward, right, right_motor, left_motor
        if name.compare("mgy") == 0:
            backward = value
        if name.compare("mgx") == 0:
            right = value
        right_motor = -1 * backward - right
        left_motor = -1 * backward + right
    radio.on_received_value(on_received_value)
    
    if right_motor >= 0:
        DFRobotMaqueenPlus.motot_run(Motors.M2, Dir.CCW, Math.map(right_motor, 0, 1023, 0, 255))
    else:
        DFRobotMaqueenPlus.motot_run(Motors.M2,
            Dir.CW,
            Math.map(abs(right_motor), 0, 1023, 0, 255))
    if left_motor >= 0:
        DFRobotMaqueenPlus.motot_run(Motors.M1, Dir.CCW, Math.map(left_motor, 0, 1023, 0, 255))
    else:
        DFRobotMaqueenPlus.motot_run(Motors.M1,
            Dir.CW,
            Math.map(abs(left_motor), 0, 1023, 0, 255))
basic.forever(on_forever)
