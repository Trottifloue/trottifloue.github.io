export default class paternList {
  static alternatePosition(phases, amplitude, duration, alpha){

    let adjustedAlpha = alpha/duration

    return ((( adjustedAlpha - adjustedAlpha%( 1/phases )) %1 )/(1/phases)) * amplitude
  }

  static invrtAlternatePosition(phases, amplitude, duration, alpha){

    return amplitude - paternList.alternatePosition(phases, amplitude, duration, alpha)
  }

  static linear(amplitude, duration, alpha){
    return (alpha/duration) * amplitude
  }

  static invrtLinear(amplitude, duration, alpha){
    return amplitude - paternList.linear(amplitude, duration, alpha)
  }

  static static(){
    return 0
  }

  static waves(amplitude, duration, alpha){
    let adjustedAlphaPi = (alpha/duration)*Math.PI

    return Math.sin(adjustedAlphaPi)*amplitude
  }
}