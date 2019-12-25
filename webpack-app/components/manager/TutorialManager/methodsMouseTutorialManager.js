export default function (TutorialManager) {
  TutorialManager.methods.showClick = async function (element) {
    throw new Error('@showClick')
  }
}