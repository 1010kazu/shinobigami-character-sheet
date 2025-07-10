import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CharacterSheetContainer, SheetHeader, SheetTitle, SheetContent, Section, SectionTitle, FormGrid, FormGroup, Label, Input, TextArea, Button, ButtonGroup, NinpoList, NinpoCard, NinpoName, NinpoCost } from './styled/CharacterSheet';
import { AbilityCell } from '../types/character';

const CharacterView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // location.state.character からデータを取得
  const character = (location.state as any)?.character;

  // 忍具・備考の編集用state
  const [ninjaTools, setNinjaTools] = useState(character?.ninjaTools || {});
  const [memo, setMemo] = useState(character?.memo || '');

  // 追加忍具のstate, handlerを削除

  if (!character) {
    return <div>キャラクターデータがありません。<Button onClick={() => navigate('/')}>戻る</Button></div>;
  }

  return (
    <CharacterSheetContainer>
      <SheetHeader>
        <SheetTitle>キャラクター閲覧画面</SheetTitle>
      </SheetHeader>
      <SheetContent>
        {/* 基本情報 */}
        <Section>
          <SectionTitle>基本情報</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>キャラクター名</Label>
              <Input value={character.basic_character_info.character_name} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>プレイヤー名</Label>
              <Input value={character.basic_character_info.player_name} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>年齢</Label>
              <Input value={character.bigami_meta_info.age} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>性別</Label>
              <Input value={character.bigami_meta_info.gender} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>流派</Label>
              <Input value={character.bigami_meta_info.school} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>下位流派</Label>
              <Input value={character.bigami_meta_info.subSchool || ''} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>階級</Label>
              <Input value={character.bigami_meta_info.rank} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>流儀</Label>
              <Input value={character.bigami_meta_info.style} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>仇敵</Label>
              <Input value={character.bigami_meta_info.rival} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>表の顔</Label>
              <Input value={character.bigami_meta_info.publicFace} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>信念</Label>
              <Input value={character.bigami_meta_info.creed} readOnly />
            </FormGroup>
            <FormGroup>
              <Label>功績</Label>
              <Input value={character.bigami_meta_info.achievement} readOnly />
            </FormGroup>
            <FormGroup style={{ gridColumn: '1 / -1' }}>
              <Label>背景</Label>
              <TextArea value={character.bigami_meta_info.background} readOnly style={{ minHeight: '120px' }} />
            </FormGroup>
          </FormGrid>
        </Section>
        {/* 能力値表 */}
        <Section>
          <SectionTitle>能力値</SectionTitle>
          <div style={{ overflowX: 'auto' }}>
            {(() => {
              const headers = ['器術', '体術', '忍術', '謀術', '戦術', '妖術'];
              const schoolToCol: Record<string, number> = {
                '斜歯忍軍': 0,
                '鞍馬神流': 1,
                'ハグレモノ': 2,
                '比良坂機関': 3,
                '私立御斎学園': 4,
                '隠忍の血統': 5,
              };
              const selectedCol = schoolToCol[character.bigami_meta_info.school] ?? -1;
              return (
                <table style={{ borderCollapse: 'collapse', margin: '0 auto', background: '#fff' }}>
                  <thead>
                    <tr>
                      <th style={{ background: '#34495e', color: '#fff', padding: '8px 12px', border: '1px solid #888' }}></th>
                      {headers.map((header, colIdx) => (
                        <React.Fragment key={colIdx}>
                          <th style={{ background: '#34495e', color: '#fff', padding: '8px 12px', border: '1px solid #888' }}>{header}</th>
                          {colIdx < headers.length - 1 && (
                            <th style={{ background: '#34495e', color: '#fff', padding: '8px 12px', border: '1px solid #888' }}></th>
                          )}
                        </React.Fragment>
                      ))}
                      <th style={{ background: '#34495e', color: '#fff', padding: '8px 12px', border: '1px solid #888' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(character.bigami_skills as AbilityCell[][]).map((row: AbilityCell[], rowIdx: number) => (
                      <tr key={rowIdx}>
                        <td style={{ background: '#eee', color: '#888', fontWeight: 'bold', border: '1px solid #888' }}>{rowIdx + 2}</td>
                        {row.map((cell: AbilityCell, colIdx: number) => (
                          <React.Fragment key={colIdx}>
                            <td
                              style={{
                                border: '1px solid #888',
                                padding: '8px 12px',
                                textAlign: 'center',
                                background: cell.selected ? '#3498db' : '#f5f5f5',
                                color: cell.selected ? '#fff' : '#222',
                                minWidth: '80px',
                                cursor: 'default',
                              }}
                            >
                              {cell.label}
                            </td>
                            {colIdx < row.length - 1 && (
                              <td
                                style={{
                                  width: '10px',
                                  background: (colIdx === selectedCol - 1 || colIdx === selectedCol) ? '#111' : '#f5f5f5',
                                  border: '1px solid #888',
                                }}
                              ></td>
                            )}
                          </React.Fragment>
                        ))}
                        <td style={{ background: '#eee', color: '#888', fontWeight: 'bold', border: '1px solid #888' }}>{rowIdx + 2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })()}
          </div>
        </Section>
        {/* 忍法カード */}
        <Section>
          <SectionTitle>忍法</SectionTitle>
          <NinpoList>
            {character.ninpo && character.ninpo.length > 0 ? (
              character.ninpo.map((n: any, index: number) => (
                <NinpoCard key={index}>
                  <NinpoName>{n.name}</NinpoName>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '0.95rem', marginBottom: '6px' }}>
                    <span>タイプ: {n.type}</span>
                    <span>指定特技: {n.skill}</span>
                    <span>間合い: {n.range}</span>
                    <span>コスト: {n.cost}</span>
                  </div>
                  <div style={{ textAlign: 'left', fontSize: '0.95rem', minHeight: '2.5em', marginBottom: '8px' }}>効果: {n.effect}</div>
                </NinpoCard>
              ))
            ) : (
              <div>忍法が登録されていません。</div>
            )}
          </NinpoList>
        </Section>
        {/* 忍具編集 */}
        <Section>
          <SectionTitle>忍具</SectionTitle>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <FormGrid style={{ width: '100%', justifyContent: 'center' }}>
              {Object.entries(ninjaTools).map(([key, value]) => {
                let label = key;
                if (key === 'hyorogan') label = '兵糧丸';
                if (key === 'jintsugan') label = '神通丸';
                if (key === 'tonkofu') label = '遁甲符';
                return (
                  <FormGroup key={key}>
                    <Label>{label}</Label>
                    <Input
                      type="number"
                      min="0"
                      value={value as number}
                      onChange={e => setNinjaTools({ ...ninjaTools, [key]: Number(e.target.value) })}
                    />
                  </FormGroup>
                );
              })}
            </FormGrid>
          </div>
        </Section>
        {/* 備考追記欄 */}
        <Section>
          <SectionTitle>備考</SectionTitle>
          <FormGroup>
            <TextArea
              value={memo}
              onChange={e => setMemo(e.target.value)}
              placeholder="備考を入力してください"
              style={{ minHeight: '120px' }}
            />
          </FormGroup>
        </Section>
      </SheetContent>
    </CharacterSheetContainer>
  );
};

export default CharacterView; 