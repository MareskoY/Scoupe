#!/usr/bin/env bash
set -e

cd /payever || true

for i in "$@"
do
case $i in
    -s=*|--spec=*)

    SPEC=${i#*=}

    if [[ -n ${SPEC} ]]; then
      SPEC=${SPEC//'dist/'/}
      SPEC=${SPEC//'tests/'/}
      SPEC=${SPEC//'./'/}
      SPEC=${SPEC//'.ts'/'.js'}
      SPEC="./dist/tests/${SPEC}"

      SPEC_LIST=("${SPEC_LIST[@]}" "${SPEC}")
    fi

    shift # past argument=value
    ;;
    -e=*|--env=*)

    DOT_ENV=${i#*=}

    shift # past argument=value
    ;;
    *)
          # unknown option
    ;;
esac
done

if [[ -z ${SPEC_LIST[0]} ]]; then
    echo "Spec not defined"

    exit 1
fi

if [[ -n ${DOT_ENV} ]]; then
  cp "${DOT_ENV}" .env
fi

echo -e "\nCurrent tests:"
echo -e "--------------"

for SPEC in "${SPEC_LIST[@]}"; do
  echo -e "${SPEC}"
done
echo -e "--------------"

node_modules/.bin/mocha "${SPEC_LIST[@]}" --color
