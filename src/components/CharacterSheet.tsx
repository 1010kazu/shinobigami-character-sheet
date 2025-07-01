import React, { useState, useEffect } from 'react';
import {
  CharacterSheetContainer,
  SheetHeader,
  SheetTitle,
  SheetContent,
  Section,
  SectionTitle,
  FormGrid,
  FormGroup,
  Label,
  Input,
  TextArea,
  LifePointsSection,
  LifePointsBox,
  LifePointsLabel,
  LifePointsValue,
  Button,
  ButtonGroup
} from './styled/CharacterSheet';
import NinpoManager from './NinpoManager';
import NinjaToolManager from './NinjaToolManager';
import { Character, School, Creed } from '../types/character';
import AbilityTable from './AbilityTable';

// AbilityTableの初期化関数
const createInitialAbilityTable = () => {
  const labels = [
    ['絡繰術', '騎乗術', '生存術', '医術', '兵糧術', '異形化'],
    ['火術', '砲術', '潜伏術', '毒術', '鳥獣術', '召喚術'],
    ['水術', '手裏剣術', '遁走術', '罠術', '野戦術', '死霊術'],
    ['針術', '手練', '盗聴術', '調査術', '地の利', '結界術'],
    ['仕込み', '身体操術', '腹話術', '詐術', '意気', '封術'],
    ['衣装術', '歩法', '隠形術', '対人術', '用兵術', '言霊術'],
    ['縄術', '走法', '変装術', '遊芸', '記憶術', '幻術'],
    ['登術', '飛術', '香術', '九ノ一の術', '見敵術', '瞳術'],
    ['拷問術', '骨法術', '分身の術', '傀儡の術', '暗号術', '千里眼の術'],
    ['壊器術', '刀術', '隠蔽術', '流言の術', '伝達術', '憑依術'],
    ['掘削術', '怪力', '第六感', '経済力', '人脈', '呪術'],
  ];
  return labels.map((row, rowIdx) =>
    row.map((label, colIdx) => ({ row: rowIdx, col: colIdx, label, selected: false }))
  );
};

const SCHOOL_OPTIONS: School[] = ['斜歯忍軍', '鞍馬神流', 'ハグレモノ', '比良坂機関', '私立御斎学園', '隠忍の血統'];
const CREED_OPTIONS: Creed[] = ['凶', '律', '我', '情', '忠', '和'];
const RIVAL_MAP: Record<School, string> = {
  '斜歯忍軍': '鞍馬神流',
  '鞍馬神流': '隠忍の血統',
  'ハグレモノ': '斜歯忍軍',
  '比良坂機関': '私立御斎学園',
  '私立御斎学園': 'ハグレモノ',
  '隠忍の血統': '比良坂機関',
};

const CharacterSheet: React.FC = () => {
  const [character, setCharacter] = useState<Character>({
    name: '',
    playerName: '',
    age: 0,
    gender: '',
    school: '斜歯忍軍',
    rank: '',
    style: '',
    publicFace: '',
    creed: '凶',
    achievement: 0,
    background: '',
    rival: RIVAL_MAP['斜歯忍軍'],
    abilityTable: createInitialAbilityTable(),
    ninpo: [],
    ninjaTools: { hyorogan: 0, jintsugan: 0, tonkofu: 0 },
    notes: ''
  });

  const [selectedHeader, setSelectedHeader] = useState<number | null>(null);

  // ローカルストレージからデータを読み込み
  useEffect(() => {
    const savedCharacter = localStorage.getItem('shinobigami-character');
    if (savedCharacter) {
      try {
        setCharacter(JSON.parse(savedCharacter));
      } catch (error) {
        console.error('Failed to parse saved character:', error);
      }
    }
  }, []);

  // キャラクター情報が変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('shinobigami-character', JSON.stringify(character));
  }, [character]);

  // 能力値セルの選択/解除
  const handleAbilityToggle = (row: number, col: number) => {
    setCharacter(prev => {
      const newTable = prev.abilityTable.map(r => r.map(c => ({ ...c })));
      newTable[row][col].selected = !newTable[row][col].selected;
      // 最大生命力を再計算
      const maxLife = newTable.flat().filter(cell => cell.selected).length;
      return { ...prev, abilityTable: newTable, maxLifePoints: maxLife };
    });
  };

  const handleHeaderClick = (col: number) => {
    setSelectedHeader(prev => (prev === col ? null : col));
  };

  const handleSave = () => {
    const characterJson = JSON.stringify(character, null, 2);
    const blob = new Blob([characterJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name || 'character'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedCharacter = JSON.parse(e.target?.result as string);
          setCharacter(loadedCharacter);
        } catch (error) {
          console.error('Failed to parse character file:', error);
          alert('キャラクターシートの読み込みに失敗しました。');
        }
      };
      reader.readAsText(file);
    }
  };

  // 流派選択時に仇敵を自動入力
  const handleSchoolChange = (school: School) => {
    setCharacter(prev => ({
      ...prev,
      school,
      rival: RIVAL_MAP[school],
    }));
  };

  return (
    <CharacterSheetContainer>
      <SheetHeader>
        <SheetTitle>シノビガミ キャラクターシート</SheetTitle>
      </SheetHeader>
      
      <SheetContent>
        {/* 基本情報 */}
        <Section>
          <SectionTitle>基本情報</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>名前</Label>
              <Input
                value={character.name}
                onChange={(e) => setCharacter(prev => ({ ...prev, name: e.target.value }))}
                placeholder="キャラクター名"
              />
            </FormGroup>
            <FormGroup>
              <Label>プレイヤー名</Label>
              <Input
                value={character.playerName}
                onChange={(e) => setCharacter(prev => ({ ...prev, playerName: e.target.value }))}
                placeholder="プレイヤー名"
              />
            </FormGroup>
            <FormGroup>
              <Label>年齢</Label>
              <Input
                type="number"
                value={character.age}
                onChange={(e) => setCharacter(prev => ({ ...prev, age: Number(e.target.value) }))}
                placeholder="年齢"
              />
            </FormGroup>
            <FormGroup>
              <Label>性別</Label>
              <Input
                value={character.gender}
                onChange={(e) => setCharacter(prev => ({ ...prev, gender: e.target.value }))}
                placeholder="性別"
              />
            </FormGroup>
            <FormGroup>
              <Label>流派</Label>
              <select
                value={character.school}
                onChange={(e) => handleSchoolChange(e.target.value as School)}
                style={{ padding: '10px', borderRadius: '5px', border: '2px solid #bdc3c7', fontSize: '1rem' }}
              >
                {SCHOOL_OPTIONS.map((school) => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <Label>階級</Label>
              <Input
                value={character.rank}
                onChange={(e) => setCharacter(prev => ({ ...prev, rank: e.target.value }))}
                placeholder="階級"
              />
            </FormGroup>
            <FormGroup>
              <Label>流儀</Label>
              <Input
                value={character.style}
                onChange={(e) => setCharacter(prev => ({ ...prev, style: e.target.value }))}
                placeholder="流儀"
              />
            </FormGroup>
            <FormGroup>
              <Label>表の顔</Label>
              <Input
                value={character.publicFace}
                onChange={(e) => setCharacter(prev => ({ ...prev, publicFace: e.target.value }))}
                placeholder="表の顔"
              />
            </FormGroup>
            <FormGroup>
              <Label>信念</Label>
              <select
                value={character.creed}
                onChange={(e) => setCharacter(prev => ({ ...prev, creed: e.target.value as Creed }))}
                style={{ padding: '10px', borderRadius: '5px', border: '2px solid #bdc3c7', fontSize: '1rem' }}
              >
                {CREED_OPTIONS.map((creed) => (
                  <option key={creed} value={creed}>{creed}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <Label>功績</Label>
              <Input
                type="number"
                min="0"
                value={character.achievement}
                onChange={(e) => setCharacter(prev => ({ ...prev, achievement: Number(e.target.value) }))}
                placeholder="功績"
              />
            </FormGroup>
            <FormGroup style={{ gridColumn: '1 / -1' }}>
              <Label>背景</Label>
              <TextArea
                value={character.background}
                onChange={(e) => setCharacter(prev => ({ ...prev, background: e.target.value }))}
                placeholder="背景を入力してください"
                style={{ minHeight: '120px' }}
              />
            </FormGroup>
            <FormGroup>
              <Label>仇敵</Label>
              <Input value={character.rival} readOnly style={{ background: '#eee' }} />
            </FormGroup>
          </FormGrid>
        </Section>

        {/* 能力値 */}
        <Section>
          <SectionTitle>能力値（表から選択）</SectionTitle>
          <AbilityTable
            table={character.abilityTable}
            onToggle={handleAbilityToggle}
            selectedHeader={selectedHeader}
            onHeaderClick={handleHeaderClick}
          />
        </Section>

        {/* 忍法 */}
        <Section>
          <SectionTitle>忍法</SectionTitle>
          <NinpoManager
            ninpo={character.ninpo}
            onUpdate={(ninpo) => setCharacter(prev => ({ ...prev, ninpo }))}
          />
        </Section>

        {/* 忍具 */}
        <Section>
          <SectionTitle>忍具</SectionTitle>
          <NinjaToolManager
            ninjaTools={character.ninjaTools}
            onUpdate={(ninjaTools) => setCharacter(prev => ({ ...prev, ninjaTools }))}
          />
        </Section>

        {/* 備考 */}
        <Section>
          <SectionTitle>備考</SectionTitle>
          <FormGroup>
            <TextArea
              value={character.notes}
              onChange={(e) => setCharacter(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="備考を入力してください"
            />
          </FormGroup>
        </Section>

        {/* 操作ボタン */}
        <Section>
          <ButtonGroup>
            <Button onClick={handleSave}>JSONとして保存</Button>
            <Button as="label" htmlFor="load-file">
              ファイルから読み込み
              <input
                id="load-file"
                type="file"
                accept=".json"
                onChange={handleLoad}
                style={{ display: 'none' }}
              />
            </Button>
          </ButtonGroup>
        </Section>
      </SheetContent>
    </CharacterSheetContainer>
  );
};

export default CharacterSheet; 