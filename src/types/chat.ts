export interface Message {
  id: number;
  senderId: string;
  senderName: string;
  text?: string;
  voiceDuration?: string;
  timestamp: string;
  isRead?: boolean;
  translatedText?: string;
  isCurrentUser: boolean;
  isVoiceMessage?: boolean;
}

export interface User {
  name: string;
  image: string;
  isOnline?: boolean;
}

export interface SuggestedMessage {
  id: number;
  text: string;
  translation: string;
}
