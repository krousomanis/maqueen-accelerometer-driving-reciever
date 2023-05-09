let backward = 0
let right = 0
let left_motor = 0
let right_motor = 0
radio.setGroup(89)
basic.showIcon(IconNames.Diamond)
basic.forever(function () {
    radio.onReceivedValue(function on_received_value(name: string, value: number) {
        
        if (name.compare("mgy") == 0) {
            backward = value
        }
        
        if (name.compare("mgx") == 0) {
            right = value
        }
        
        right_motor = -1 * backward - right
        left_motor = -1 * backward + right
    })
if (right_motor >= 0) {
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, Math.map(right_motor, 0, 1023, 0, 255))
    } else {
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, Math.map(Math.abs(right_motor), 0, 1023, 0, 255))
    }
    if (left_motor >= 0) {
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, Math.map(left_motor, 0, 1023, 0, 255))
    } else {
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, Math.map(Math.abs(left_motor), 0, 1023, 0, 255))
    }
})
