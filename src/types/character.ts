export interface Character {
  // 基本情報
  name: string;
  school: string;
  secret: string;
  publicFace: string;
  age: number;
  gender: string;
  location: string;
  
  // 能力値
  stats: {
    taijutsu: number;    // 体術
    ninjutsu: number;    // 忍術
    onmyojutsu: number;  // 妖術
    boujutsu: number;    // 謀術
    senjutsu: number;    // 戦術
    kijutsu: number;     // 器術
  };
  
  // 生命力
  lifePoints: number;
  maxLifePoints: number;
  
  // 忍法
  ninpo: Ninpo[];
  
  // 忍具
  ninjaTools: NinjaTool[];
  
  // 備考
  notes: string;
}

export interface Ninpo {
  name: string;
  description: string;
  cost: number;
}

export interface NinjaTool {
  name: string;
  description: string;
  quantity: number;
}

export interface StatModifier {
  stat: keyof Character['stats'];
  value: number;
  source: string;
} 