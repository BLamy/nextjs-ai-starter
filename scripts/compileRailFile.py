import sys
import guardrails as gd
guard = gd.Guard.from_rail(sys.argv[1])
print(guard.base_prompt)
sys.stdout.flush()