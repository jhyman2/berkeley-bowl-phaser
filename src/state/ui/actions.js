const COLLIDE_ENEMY = 'COLLIDE_ENEMY';
export default function collide(enemy) {
  console.log('COLLIDE', enemy);
  return {
    type: COLLIDE_ENEMY,
    enemy,
  };
}
