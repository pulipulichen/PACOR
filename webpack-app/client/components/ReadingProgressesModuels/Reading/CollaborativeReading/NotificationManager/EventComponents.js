import EventAnnotationComment from './NotificationEvent/EventAnnotationComment/EventAnnotationComment.vue'
import EventAnnotationCommentRate from './NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.vue'
import EventAnnotationRate from './NotificationEvent/EventAnnotationRate/EventAnnotationRate.vue'
import EventReadingProgress from './NotificationEvent/EventReadingProgress/EventReadingProgress.vue'

export default (VM) => {
  VM.components.EventAnnotationComment = EventAnnotationComment
  VM.components.EventAnnotationCommentRate = EventAnnotationCommentRate
  VM.components.EventAnnotationRate = EventAnnotationRate
  VM.components.EventReadingProgress = EventReadingProgress
}