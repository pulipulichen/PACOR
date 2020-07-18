
sigma.utils.getAngle = function(sX, sY, tX, tY) {
    // (Math.atan2((tY - sY), (tX - sX)) + 90) * 180 / Math.PI
  
    let angle = Math.atan2((tY - sY), (tX - sX))   //radians
    // you need to devide by PI, and MULTIPLY by 180:
    let degrees = 180*angle / Math.PI;  //degrees
    //if (degrees < 0) {
    //  degrees = degrees + 360
    //}
    return (360+Math.round(degrees))%360; //round number, avoid decimal fragments
}

sigma.utils.adjustTargetXbyAngle = function(sX, sY, tX, tY) {
  let adjust = 0
  let angle = this.getAngle(sX, sY, tX, tY)
  let angleRange = 15
  let overRange = 1
  if (angle > angleRange * overRange && angle < 90 - angleRange) {
    adjust = 1
  }
  else if (angle > 90 + angleRange && angle < 180 + (angleRange) * overRange) {
    adjust = 1
  }
  else if (angle > 180 + (angleRange) * overRange && angle < 270 - angleRange) {
    adjust = -1
  }
  else if (angle > 270 + angleRange || angle < angleRange * overRange) {
    adjust = -1
  }

  return adjust
}

sigma.utils.adjustTargetYbyAngle = function(sX, sY, tX, tY) {
  let adjust = 0
  let angle = this.getAngle(sX, sY, tX, tY)
  let angleRange = 15
  if (angle < angleRange) {
    adjust = 0
  }
  else if (angle > angleRange && angle < angleRange * 3) {
    adjust = -1
  }
  else if (angle > 180 && angle < 180 + angleRange) {
    adjust = 0
  }
  else if (angle > 180 + angleRange && angle < 180 + (angleRange * 3) ) {
    adjust = 1
  }
  /*
  if (angle > angleRange && angle < angleRange * 2) {
    adjust = -1
  }
  else if (angle > 180 && angle < 180 + angleRange) {
    adjust = 1
  }
  */
  
  return adjust
}

// 