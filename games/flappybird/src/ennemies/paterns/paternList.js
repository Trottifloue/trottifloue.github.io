export default {
  alternatePosition : function(phases, amplitude, duration, alpha){

    let adjustedAlpha = alpha/duration

    return ((( adjustedAlpha - adjustedAlpha%( 1/phases )) %1 )/(1/phases)) * amplitude
  }
}