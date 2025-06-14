export interface Tech {
  id?: string;
  name: string;
  level?: 'STRONG' | 'KNOWLEDGEABLE' | 'EXPERIENCED';
  type?: 'FRONT' | 'BACK' | 'OTHER';
}
