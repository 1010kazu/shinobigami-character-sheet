import React from 'react';
import styled from 'styled-components';
import { AbilityCell, AbilityName } from '../types/character';
import { AbilityTableWrapper } from './styled/CharacterSheet';

const ABILITY_NAMES: AbilityName[] = ['器術', '体術', '忍術', '謀術', '戦術', '妖術'];
const SKILL_LABELS = [
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

const Table = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
  background: #fff;
`;
const Th = styled.th<{ selected?: boolean }>`
  background: ${({ selected }) => (selected ? '#e67e22' : '#34495e')};
  color: #fff;
  padding: 8px 12px;
  border: 1px solid #888;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
`;
const Td = styled.td<{ selected?: boolean }>`
  border: 1px solid #888;
  padding: 8px 12px;
  text-align: center;
  background: ${({ selected }) => (selected ? '#3498db' : '#f5f5f5')};
  color: ${({ selected }) => (selected ? '#fff' : '#222')};
  cursor: pointer;
  transition: background 0.2s;
  min-width: 80px;
`;
const RowNum = styled.td`
  background: #eee;
  color: #888;
  font-weight: bold;
  border: 1px solid #888;
  width: 32px;
`;
const AbilitySum = styled.div`
  margin: 10px 0 0 0;
  text-align: center;
  font-size: 1.1rem;
`;

interface Props {
  table: AbilityCell[][];
  onToggle: (row: number, col: number) => void;
  selectedHeader: number | null;
  onHeaderClick: (col: number) => void;
}

const AbilityTable: React.FC<Props> = ({ table, onToggle, selectedHeader, onHeaderClick }) => {
  // 各能力値ごとの選択数
  const abilityCounts = ABILITY_NAMES.map((_, col) =>
    table.reduce((sum, row) => sum + (row[col].selected ? 1 : 0), 0)
  );
  const maxLife = abilityCounts.reduce((a, b) => a + b, 0);

  return (
    <AbilityTableWrapper>
      <Table>
        <thead>
          <tr>
            <RowNum />
            {ABILITY_NAMES.map((name, i) => (
              <Th
                key={i}
                selected={selectedHeader === i}
                onClick={() => onHeaderClick(i)}
              >
                {name}
              </Th>
            ))}
            <RowNum />
          </tr>
        </thead>
        <tbody>
          {table.map((row, rowIdx) => (
            <tr key={rowIdx}>
              <RowNum>{rowIdx + 2}</RowNum>
              {row.map((cell, colIdx) => (
                <Td
                  key={colIdx}
                  selected={cell.selected}
                  onClick={() => onToggle(rowIdx, colIdx)}
                >
                  {cell.label}
                </Td>
              ))}
              <RowNum>{rowIdx + 2}</RowNum>
            </tr>
          ))}
        </tbody>
      </Table>
      <AbilitySum>
        {ABILITY_NAMES.map((name, i) => `${name}: ${abilityCounts[i]}`).join(' ／ ')}<br />
        最大生命力: {maxLife}
      </AbilitySum>
    </AbilityTableWrapper>
  );
};

export default AbilityTable; 