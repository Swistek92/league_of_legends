export interface UserDocument extends Document {
  name: string;
  email: string;
  image?: string;
  stared?: string[];
}
