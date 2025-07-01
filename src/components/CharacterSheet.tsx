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
  StatsGrid,
  StatBox,
  StatName,
  StatValue,
  LifePointsSection,
  LifePointsBox,
  LifePointsLabel,
  LifePointsValue,
  Button,
  ButtonGroup
} from './styled/CharacterSheet';
import StatModal from './StatModal';
import NinpoManager from './NinpoManager';
import NinjaToolManager from './NinjaToolManager';
import { Character } from '../types/character';

const CharacterSheet: React.FC = () => {
  const [character, setCharacter] = useState<Character>({
    name: '',
    playerName: '',
    rival: '',
    rank: '',
    achievement: 0,
    school: '',
    secret: '',
    publicFace: '',
    age: 0,
    gender: '',
    location: '',
    stats: {
      taijutsu: 0,
      ninjutsu: 0,
      onmyojutsu: 0,
      boujutsu: 0,
      senjutsu: 0,
      kijutsu: 0
    },
    lifePoints: 0,
    maxLifePoints: 0,
    ninpo: [],
    ninjaTools: [],
    notes: ''
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    statName: string;
    statKey: keyof Character['stats'];
  }>({
    isOpen: false,
    statName: '',
    statKey: 'taijutsu'
  });

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

  const handleStatClick = (statName: string, statKey: keyof Character['stats']) => {
    setModalState({
      isOpen: true,
      statName,
      statKey
    });
  };

  const handleStatSave = (value: number) => {
    setCharacter(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [modalState.statKey]: value
      }
    }));
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

  const statNames = {
    taijutsu: '体術',
    ninjutsu: '忍術',
    onmyojutsu: '妖術',
    boujutsu: '謀術',
    senjutsu: '戦術',
    kijutsu: '器術'
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
              <Label>仇敵</Label>
              <Input
                value={character.rival}
                onChange={(e) => setCharacter(prev => ({ ...prev, rival: e.target.value }))}
                placeholder="仇敵"
              />
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
              <Label>功績</Label>
              <Input
                type="number"
                min="0"
                value={character.achievement}
                onChange={(e) => setCharacter(prev => ({ ...prev, achievement: Number(e.target.value) }))}
                placeholder="功績"
              />
            </FormGroup>
            <FormGroup>
              <Label>流派</Label>
              <Input
                value={character.school}
                onChange={(e) => setCharacter(prev => ({ ...prev, school: e.target.value }))}
                placeholder="流派名"
              />
            </FormGroup>
            <FormGroup>
              <Label>秘密</Label>
              <Input
                value={character.secret}
                onChange={(e) => setCharacter(prev => ({ ...prev, secret: e.target.value }))}
                placeholder="秘密"
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
              <Label>居所</Label>
              <Input
                value={character.location}
                onChange={(e) => setCharacter(prev => ({ ...prev, location: e.target.value }))}
                placeholder="居所"
              />
            </FormGroup>
          </FormGrid>
        </Section>

        {/* 能力値 */}
        <Section>
          <SectionTitle>能力値（クリックして設定）</SectionTitle>
          <StatsGrid>
            {Object.entries(statNames).map(([key, name]) => (
              <StatBox
                key={key}
                onClick={() => handleStatClick(name, key as keyof Character['stats'])}
              >
                <StatName>{name}</StatName>
                <StatValue>{character.stats[key as keyof Character['stats']]}</StatValue>
              </StatBox>
            ))}
          </StatsGrid>
        </Section>

        {/* 生命力 */}
        <Section>
          <SectionTitle>生命力</SectionTitle>
          <LifePointsSection>
            <LifePointsBox>
              <LifePointsLabel>現在の生命力</LifePointsLabel>
              <LifePointsValue>{character.lifePoints}</LifePointsValue>
            </LifePointsBox>
            <FormGroup>
              <Label>現在の生命力</Label>
              <Input
                type="number"
                min="0"
                value={character.lifePoints}
                onChange={(e) => setCharacter(prev => ({ ...prev, lifePoints: Number(e.target.value) }))}
              />
            </FormGroup>
            <FormGroup>
              <Label>最大生命力</Label>
              <Input
                type="number"
                min="0"
                value={character.maxLifePoints}
                onChange={(e) => setCharacter(prev => ({ ...prev, maxLifePoints: Number(e.target.value) }))}
              />
            </FormGroup>
          </LifePointsSection>
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

      <StatModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        onSave={handleStatSave}
        statName={modalState.statName}
        currentValue={character.stats[modalState.statKey]}
      />
    </CharacterSheetContainer>
  );
};

export default CharacterSheet; 