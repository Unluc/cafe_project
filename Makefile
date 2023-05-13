start:
	# Clean orphan images
	docker system prune
	# Run container
	docker-compose up --build

createsuperuser:
	docker-compose run --user 1000:1000 --rm backend python3 manage.py createsuperuser

makemigrations:
	docker-compose run --rm backend bash -c "python3 manage.py makemigrations $(app)"

migrate:
	docker-compose run --user 1000:1000 --rm backend bash -c "python3 manage.py migrate $(app)"

startapp:
	docker-compose run --user 1000:1000 --rm backend bash -c "python3 manage.py startapp $(app) apps/$(app)"

create_templates:
	docker-compose run --user 1000:1000 --rm backend bash -c "python3 manage.py create_templates"

update_project:
	docker-compose run --user 1000:1000 --rm backend bash -c "cd app/deploy && fab update_project"

update_transes:
	docker-compose run --user 1000:1000 --rm backend bash -c "python3 manage.py update_translation_fields"

shell:
	docker-compose run backend python3 manage.py shell

frontend_run:
	docker-compose run --user 1000:1000 --rm frontend bash -c "$(cmd)"

backend_manage:
	docker-compose run --rm backend bash -c "python3 manage.py $(cmd)"

backend_run:
	docker-compose run --rm backend bash -c "$(cmd)"

clean_all_dockers:
	docker system prune
	docker system prune -a