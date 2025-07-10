export type AbilityName =
  | '器術' | '体術' | '忍術' | '謀術' | '戦術' | '妖術';

export interface AbilityCell {
  row: number;
  col: number;
  label: string;
  selected: boolean;
}

export type School = '斜歯忍軍' | '鞍馬神流' | 'ハグレモノ' | '比良坂機関' | '私立御斎学園' | '隠忍の血統';
export type Creed = '凶' | '律' | '我' | '情' | '忠' | '和';

export interface Character {
  // 基本情報
  name: string;
  playerName: string; // プレイヤー名
  age: number;
  gender: string;
  school: School;
  subSchool: string; // 下位流派
  rank: string;
  style: string; // 流儀
  publicFace: string;
  creed: Creed;
  achievement: number;
  background: string;
  rival: string; // 仇敵（自動入力）
  
  // 能力値
  abilityTable: AbilityCell[][]; // 12行6列の表
  
  // 忍法
  ninpo: Ninpo[];
  
  // 忍具
  ninjaTools: NinjaTool;
  
  // 備考
  notes: string;
}

export type NinpoType = '攻撃' | 'サポート' | '装備';

export interface Ninpo {
  name: string;
  type: NinpoType;
  skill: string;
  range: number;
  cost: number;
  effect: string;
}

export interface NinjaTool {
  hyorogan: number;   // 兵糧丸
  jintsugan: number; // 神通丸
  tonkofu: number;    // 遁甲符
}

export interface StatModifier {
  stat: string;
  value: number;
  source: string;
} 