const COLLIDE_ENEMY = 'COLLIDE_ENEMY';
export default function collide(enemy) {
  return {
    type: COLLIDE_ENEMY,
    enemy,
  };
}
