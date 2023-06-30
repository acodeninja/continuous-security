#!/usr/bin/env ruby
require 'json'
require 'open3'

stdout, stderr, status = Open3.capture3 'bundle-audit check'

output = Array.new

stdout.split("\n\n").each do |entry|
  next if entry.include? "Vulnerabilities found!"

  details = {}
  entry.split("\n").each do |d|
    label, value = d.split(': ')
    details[label] = value
  end

  output.append(details)
end

File.write "/output/report.json", {issues: output}.to_json
