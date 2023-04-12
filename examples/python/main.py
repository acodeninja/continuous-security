def try_catch_pass():
  try:
    print('thing')
  except:
    pass

def login(username, password):
  if password == 'password':
    return True
  return False
