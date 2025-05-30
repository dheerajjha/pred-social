export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  SYSTEM = 'system'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DELETED = 'deleted'
}

export enum AuthProvider {
  EMAIL = 'email',
  KITE = 'kite',
  GOOGLE = 'google',
  PHONE = 'phone'
}

export enum FollowType {
  USER = 'user',
  STOCK = 'stock',
  COMMUNITY = 'community'
} 