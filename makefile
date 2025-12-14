.PHONY: copy generate gitpush deploy

copy:
	rsync -a --delete .output/public/ docs/
	touch docs/.nojekyll
	
gitpush:
	git add . ; git commit -am "deploy generated files"; git push -u origin main;

generate:
	npm run generate

deploy: generate copy gitpush