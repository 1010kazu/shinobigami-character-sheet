import styled from 'styled-components';

export const CharacterSheetContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  font-family: 'Noto Sans JP', sans-serif;
`;

export const SheetHeader = styled.div`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 20px;
  border-radius: 10px 10px 0 0;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SheetTitle = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const SheetContent = styled.div`
  background: white;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const Section = styled.div`
  padding: 20px;
  border-bottom: 2px solid #ecf0f1;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 3px solid #e74c3c;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 50px;
    height: 3px;
    background: #3498db;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #34495e;
  margin-bottom: 5px;
  font-size: 0.9rem;
`;

export const Input = styled.input`
  padding: 10px;
  border: 2px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
  }
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 2px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin: 20px 0;
`;

export const StatBox = styled.div`
  background: linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%);
  border: 2px solid #95a5a6;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-color: #3498db;
  }
`;

export const StatName = styled.div`
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #e74c3c;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

export const LifePointsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

export const LifePointsBox = styled.div`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

export const LifePointsLabel = styled.div`
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

export const LifePointsValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const DangerButton = styled(Button)`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  
  &:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

export const NinpoList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  margin: 15px 0;
`;

export const NinpoCard = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid #dee2e6;
  border-radius: 8px;
  padding: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #6c757d;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const NinpoName = styled.div`
  font-weight: bold;
  color: #495057;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

export const NinpoDescription = styled.div`
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

export const NinpoCost = styled.div`
  color: #e74c3c;
  font-weight: bold;
  font-size: 0.9rem;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
`;

export const ModalTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #2c3e50;
  text-align: center;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`; 