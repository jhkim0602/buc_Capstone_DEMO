# Phase 01 Validation

## 점검 방법
- Linear DS config 스캔: 필수 섹션 존재 여부 확인
- Command:
  ```
  python - <<'PY'
  from pathlib import Path
  root = Path('web/components/features/ctp/contents/categories/linear')
  configs = list(root.rglob('config.ts'))
  needed = ['story', 'features', 'complexity', 'implementation', 'practiceProblems']
  missing = {}
  for path in configs:
      text = path.read_text()
      miss = [k for k in needed if f'{k}:' not in text]
      if miss:
          missing[str(path)] = miss

  print('configs', len(configs))
  print('missing sections', len(missing))
  for p, miss in missing.items():
      print(p)
      print('  missing:', ', '.join(miss))
  PY
  ```

## 결과
- configs: 18
- missing sections: 0
- 모든 Linear DS sub-concept가 필수 섹션을 보유함
