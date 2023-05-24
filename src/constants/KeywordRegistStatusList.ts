const KeywordRegistStatusList = [
  { text: '등록 & 수정', value: 'S' },
  { text: '등록', value: 'C' },
  { text: '수정', value: 'U' },
  { text: '삭제', value: 'D' },
];

export const KeywordJobTaskMap: { [key: string]: string } = {
  S: '등록 & 수정',
  C: '등록',
  U: '수정',
  D: '삭제',
};

export const KeywordJobStatusMap: { [key: string]: { text: string; color: string } } = {
  S: { text: '성공', color: 'green' },
  B: { text: '실행 전', color: '#3cb1e1' },
  R: { text: '실행 중', color: '#0065ff' },
  F: { text: '실패', color: '#c12226' },
  P: { text: '부분 성공', color: 'orange' },
  T: { text: '템플릿 오류', color: 'orange' },
  D: { text: '중복 오류', color: 'orange' },
  N: { text: '결과 없음', color: 'gray' },
  C: { text: '취소', color: '#c12226' },
  E: { text: '실행 중', color: '#0065ff' },
};

export default KeywordRegistStatusList;
