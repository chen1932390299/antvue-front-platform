<template>
     
    <a-card title="用户-角色-关联" style="margin-top: 40px;">
     
        <a-tree
        v-model="checkedKeys"
        checkable
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @expand="onExpand"
        @select="onSelect"
      />

      <a-button type="primary" @click="submit"  style="margin-left: 30%; margin-top: 40px;">submit</a-button>
      <a-button  @click="cancle" style="margin-left: 40px;">cancle</a-button>
    </a-card>
     
    </template>
     
    <script>
        const treeData = [
       
                    ];
        for (let i=0; i<11; i++){
            treeData.push(
                     {
                        title: `${i}-role`,
                        key: `${i}`,
                     }
            )
        }
        export default{
     
            data () {
                return {
                     
                    expandedKeys: [],
                    autoExpandParent: true,
                    checkedKeys: [],
                    selectedKeys: [],
                    treeData,
                }
            },
            //
            watch: {
                checkedKeys(val) {
                console.log('onCheck', val);
                },
            },
     
            methods: {
                onExpand(expandedKeys) {
                    console.log('onExpand', expandedKeys);
                    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                    // or, you can remove all expanded children keys.
                    this.expandedKeys = expandedKeys;
                    this.autoExpandParent = false;
                },
                onCheck(checkedKeys) {
                    console.log('onCheck', Array.from(checkedKeys));
                    this.checkedKeys = checkedKeys;
                },
                onSelect(selectedKeys, info) {
                    console.log('onSelect', info);
                    this.selectedKeys = selectedKeys;
                },
                submit(){
                    let userid = this.$route.params.id
                    console.log(`用户id is : ${userid}, rolekeys is :${this.checkedKeys}`)
                    console.log("role array ",this.checkedKeys)
                    this.$message.success(" 关联成功！")

                    this.$router.push({
                        name:"user-list"
                    })
                   
                },
                cancle(){
                    this.$router.push({
                        name:"user-list"
                    })
                    
                  
                }
     
            },
            created () {
                 
                let id =this.$route.params.id
                this.checkedKeys = [id.toString()]
            }
        }
     
     
    </script>