export enum NotificationType {
  PREDICTION_HIT = 'prediction_hit',
  PREDICTION_MISS = 'prediction_miss',
  PREDICTION_COMMENT = 'prediction_comment',
  FOLLOW_USER = 'follow_user',
  FOLLOW_STOCK = 'follow_stock',
  MARKET_ALERT = 'market_alert',
  NEWS_ALERT = 'news_alert',
  COMMUNITY_POST = 'community_post',
  COMMUNITY_INVITE = 'community_invite',
  SYSTEM = 'system'
}

export enum NotificationChannel {
  IN_APP = 'in_app',
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  WEBHOOK = 'webhook'
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed'
} 