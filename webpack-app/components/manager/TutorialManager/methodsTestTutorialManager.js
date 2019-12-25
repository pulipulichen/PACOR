export default function (TutorialManager) {
  TutorialManager.methods._test = async function () {
    await this.lib.VueHelper.sleep(3000)

    this.addAction({
      element: $('.my-MainIdea:first'),
      content: '1 Welcome, click on the screen at any position to enter the next step',
      order: 2
    })

    this.addAction({
      element: $('.DigitalCountdownTimer:first'),
      //content: '2 Welcome, click on the screen at any position to enter the next step',
      order: 1
    })

    this.start()

    await this.lib.VueHelper.sleep(3000)

    //this.stop()
  }
}